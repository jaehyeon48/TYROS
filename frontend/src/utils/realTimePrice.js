import axios from 'axios';

export const getRealTimePrice = async ticker => {
  // try {
  //   // const response = await axios.get(`/api/stock/realTime/${ticker}`);
  //   const response = await axios.get(`/api/stock/close/${ticker}`); // show close price when the market is closed.
  //   console.log(response);
  //   return response.data.toFixed(2);
  // } catch (err) {
  //   console.error(err);
  // }
  const realTimePriceRes = await axios.get(`/api/stock/realTime/${ticker}`);
  if (realTimePriceRes.status === 404) {
    try {
      const closePriceRes = await axios.get(`/api/stock/close/${ticker}`);
      return closePriceRes.data.toFixed(2);
    } catch (err) {
      console.error(err);
    }
  }
  return realTimePriceRes.data.toFixed(2);
}