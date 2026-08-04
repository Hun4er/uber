import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)

export default function SocketProvider({ children }) {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  // Store the last joined identity so we can re-join on reconnect
  const identityRef = useRef(null)

  const SOCKET_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id)
      setConnected(true)
      // Auto re-join if we had an identity before (handles reconnects)
      if (identityRef.current) {
        socket.emit('join', identityRef.current)
        console.log('[Socket] Auto re-joined with identity:', identityRef.current)
      }
    })

    socket.on('disconnect', (reason) => {
      setConnected(false)
      console.log('[Socket] Disconnected:', reason)
    })

    socket.on('connect_error', (err) => {
      setConnected(false)
      console.warn('[Socket] connect_error:', err?.message)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
      setConnected(false)
    }
  }, [SOCKET_URL])

  /**
   * Emit 'join' to register user/captain identity.
   * Also saves identity for auto-rejoin on reconnect.
   */
  const joinSocket = useCallback((userType, userId) => {
    const socket = socketRef.current
    if (!socket) {
      console.warn('[Socket] joinSocket: socket not ready')
      return false
    }
    const payload = { userType, userId }
    identityRef.current = payload
    if (socket.connected) {
      socket.emit('join', payload)
      console.log('[Socket] Joined:', payload, 'socketId:', socket.id)
    } else {
      console.log('[Socket] Will join when connected:', payload)
    }
    return true
  }, [])

  const sendMessageToEvent = useCallback((eventName, payload) => {
    const socket = socketRef.current
    if (!socket || !socket.connected) {
      console.warn('[Socket] Not connected, cannot emit:', eventName)
      return false
    }
    socket.emit(eventName, payload)
    return true
  }, [])

  /**
   * Register a socket event listener. Returns an unsubscribe function.
   * Safe to call before socket connects — socket.on() buffers internally.
   */
  const receiveMessageFromEvent = useCallback((eventName, handler) => {
    const socket = socketRef.current
    if (!socket) {
      console.warn('[Socket] receiveMessageFromEvent: socket not ready for event:', eventName)
      return () => {}
    }
    socket.on(eventName, handler)
    console.log('[Socket] Listener registered for:', eventName)
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, handler)
        console.log('[Socket] Listener removed for:', eventName)
      }
    }
  }, [])

  return (
    <SocketContext.Provider value={{ joinSocket, sendMessageToEvent, receiveMessageFromEvent, connected }}>
      {children}
    </SocketContext.Provider>
  )
}
