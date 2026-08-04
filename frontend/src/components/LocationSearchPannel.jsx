import React from 'react'

export const LocationSearchPannel = ({ suggestions = [], isLoadingSuggestions = false, onSelectSuggestion, setPanelOpen, setVehiclePannel }) => {
  const handleSelect = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion)
    } else {
      setVehiclePannel(true)
      setPanelOpen(false)
    }
  }

  return (
    <div className='max-h-[250px] overflow-y-auto'>
      {isLoadingSuggestions && (
        <div className='py-2 text-sm text-gray-500'>Loading suggestions...</div>
      )}

      {!isLoadingSuggestions && suggestions.length === 0 && (
        <div className='py-2 text-sm text-gray-500'>Start typing to see suggestions.</div>
      )}

      {suggestions.map((elem, idx) => {
        const description = elem?.description || elem?.place_name || elem

        return (
          <div
            key={idx}
            onClick={() => handleSelect(elem)}
            className='flex gap-4 border-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium text-sm'>{description}</h4>
          </div>
        )
      })}
    </div>
  )
}
