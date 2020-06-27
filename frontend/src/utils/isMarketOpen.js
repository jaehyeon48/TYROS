import axios from 'axios';

// check whether the market is open or not
export const checkMarketOpened = async () => {
  try {
    await axios.get('/api/stock/realTime/aapl');
    return true;
  } catch (err) {
    return false;
  }
}