import axios from 'axios';

export const calcTodayGain = async (ticker, totalQty) => {
  try {
    const changeResponse = await axios.get(`/api/stock/change/${ticker}`);
    const totalTodayChange = (changeResponse.data * totalQty).toFixed(2);

    const changePercentResponse = await axios.get(`/api/stock/changePercent/${ticker}`);
    const changePercent = (changePercentResponse.data * 100).toFixed(2);

    return { change: totalTodayChange, changePercent };
  } catch (err) {
    console.error(err);
  }
}