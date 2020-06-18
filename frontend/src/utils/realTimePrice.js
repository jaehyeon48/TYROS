import axios from 'axios';

export const getRealTimePrice = async ticker => {
  try {
    const response = await axios.get(`/api/stock/realTime/${ticker}`);
    return response.data.toFixed(2);
  } catch (err) {
    console.error(err);
  }
}