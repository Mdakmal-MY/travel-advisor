import axios from "axios";
  
export const getPlacesData = async (type, sw, ne) => {
    try {
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          method: 'GET',
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
          }
        });
        console.log({data:type});
        return response.data.data;
    } catch(err) {
        console.log(err);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: {
          lon: lng,
          lat: lat,
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
      });
    return data;
  } catch(e) {
    console.log(e);
  }
}