const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  if (!address || typeof address !== 'string') {
    throw new Error('Address must be a non-empty string');
  }

  const mapboxApiKey = process.env.MAP_API_KEY;
  if (!mapboxApiKey) {
    throw new Error('Mapbox API key is not configured. Set MAPBOX_API_KEY in environment variables.');
  }

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json';

  const response = await axios.get(url, {
    params: {
      access_token: mapboxApiKey,
      limit: 1,
    },
  });

  const features = response.data?.features;
  if (!Array.isArray(features) || features.length === 0) {
    throw new Error('Unable to geocode the provided address');
  }

  const [lng, lat] = features[0].center;
  return {
    lat,
    lng,
  };
};


module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const apiKey = process.env.MAP_API_KEY;

  // Helper function to convert address -> coordinates
  const getCoordinates = async (place) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json`;

    const response = await axios.get(url, {
      params: {
        access_token: apiKey,
        limit: 1
      }
    });

    if (!response.data.features || response.data.features.length === 0) {
      throw new Error(`Unable to find location: ${place}`);
    }

    return response.data.features[0].center; // [lng, lat]
  };

  try {
    // Get coordinates for origin & destination
    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    // Directions API
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${destinationCoords[0]},${destinationCoords[1]}`;

    const response = await axios.get(directionsUrl, {
      params: {
        access_token: apiKey,
        geometries: "geojson"
      }
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("No Routes Found");
    }

    const route = response.data.routes[0];

    // Return in Google Distance Matrix format
    return {
      distance: {
        text: `${(route.distance / 1000).toFixed(1)} km`,
        value: Math.round(route.distance)
      },
      duration: {
        text: `${Math.round(route.duration / 60)} mins`,
        value: Math.round(route.duration)
      }
    };

  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};