import axios from 'axios';

export const getRealTimePrice = async ticker => {
  try {
    const realTimePriceRes = await axios.get(`/api/stock/realTime/${ticker}`);
    return realTimePriceRes.data.toFixed(2);
  } catch (err) {
    if (err.response.status === 404) {
      try {
        const closePriceRes = await axios.get(`/api/stock/close/${ticker}`);
        return closePriceRes.data.toFixed(2);
      } catch (err) {
        console.error(err);
      }
    }
  }
}