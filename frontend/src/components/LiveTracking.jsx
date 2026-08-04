import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || import.meta.env.MAP_API_KEY || ''

if (mapboxToken) {
  mapboxgl.accessToken = mapboxToken
}

const LiveTracking = ({ ride }) => {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const [status, setStatus] = useState('Waiting for captain location...')

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [77.021, 28.7041],
        zoom: 12,
      })

      markerRef.current = new mapboxgl.Marker({ color: '#16a34a' }).setLngLat([77.021, 28.7041]).addTo(mapRef.current)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return

    const updateMarker = (location) => {
      if (!location) return

      const lng = Number(location.lng)
      const lat = Number(location.lat)
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) return

      markerRef.current?.setLngLat([lng, lat])
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 14, essential: true })
      setStatus('Captain is on the way')
    }

    updateMarker(ride?.captain?.location)

    const intervalId = window.setInterval(() => {
      updateMarker(ride?.captain?.location)
    }, 10000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [ride?.captain?.location])

  useEffect(() => {
    return () => {
      mapRef.current?.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [])

  return (
    <div className='relative w-full h-full rounded-xl overflow-hidden border border-gray-200'>
      <div ref={mapContainer} className='w-full h-full' />
      <div className='absolute bottom-3 left-3 bg-white/90 px-3 py-2 rounded-lg shadow text-sm font-medium'>
        {status}
      </div>
    </div>
  )
}

export default LiveTracking