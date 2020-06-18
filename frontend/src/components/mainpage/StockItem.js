import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getRealTimePrice } from '../../utils/realTimePrice';
import { calcTotalGain } from '../../utils/calcTotalGain';
import { calcTodayGain } from '../../utils/calcTodayGain';

const StockItem = ({
  stock
}) => {
  const [realTimePrice, setRealTimePrice] = useState({});
  const [todayGain, setTodayGain] = useState({});
  const [totalGain, setTotalGain] = useState({});
  useEffect(() => {
    setRealTimePrice({ [stock.ticker]: '' });
    setTotalGain({ [stock.ticker]: '' });
    setInterval(async () => {
      setRealTimePrice({
        ...realTimePrice,
        [stock.ticker]: await getRealTimePrice(stock.ticker)
      });
    }, 4000); // for testing, use 4000ms
  }, [stock]);

  useEffect(() => {
    if (!!realTimePrice[stock.ticker]) {
      (async () => {
        const todayGain = await calcTodayGain(stock.ticker, stock.quantity);
        setTodayGain({
          ...todayGain,
          [stock.ticker]: todayGain
        });
      })();
      setTotalGain({
        ...totalGain,
        [stock.ticker]: calcTotalGain(realTimePrice[stock.ticker], stock.avgCost, stock.quantity)
      });
    }
  }, [realTimePrice]);

  return (
    stock.quantity > 0 ? (
      <div className="stock-item">
        <div className="stock-item-ticker">
          {stock.ticker.toUpperCase()}
        </div>
        <div className="stock-item-realtime">{realTimePrice[stock.ticker]}</div>
        <div className="stock-item-avgCost">
          Avg.Cost: {stock.avgCost}
        </div>
        <div className="stock-item-quantity">
          Quantity: {stock.quantity}
        </div>
        <div className="stock-item-todayGain">Today: {todayGain[stock.ticker] && <React.Fragment>
          {todayGain[stock.ticker].change} ({todayGain[stock.ticker].changePercent})%
        </React.Fragment>}</div>
        <div className="stock-item-totalGain">Total: {totalGain[stock.ticker] && <React.Fragment>
          {totalGain[stock.ticker].totalGain} ({totalGain[stock.ticker].totalGainPercent})%
        </React.Fragment>}</div>
      </div>
    ) : null
  );
}

StockItem.propTypes = {

}

export default StockItem;
