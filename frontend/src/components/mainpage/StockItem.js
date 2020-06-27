import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getRealTimePrice } from '../../utils/realTimePrice';
import { calcTotalGain } from '../../utils/calcTotalGain';
import { calcTodayGain } from '../../utils/calcTodayGain';
import { checkMarketOpened } from '../../utils/isMarketOpen';

const StockItem = ({
  stock,
  gainSelect
}) => {
  const [realTimePrice, setRealTimePrice] = useState({});
  const [todayGain, setTodayGain] = useState({});
  const [totalGain, setTotalGain] = useState({});
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => { setIsMarketOpen(checkMarketOpened()) }, []);

  useEffect(() => {
    setRealTimePrice({ [stock.ticker]: '' });
    setTotalGain({ [stock.ticker]: '' });
    if (isFirstRender) {
      setIsFirstRender(false);
      (async () => {
        setRealTimePrice({
          ...realTimePrice,
          [stock.ticker]: await getRealTimePrice(stock.ticker)
        });
      })();
    }
    if (isMarketOpen) {
      const intervalId = setInterval(async () => {
        setRealTimePrice({
          ...realTimePrice,
          [stock.ticker]: await getRealTimePrice(stock.ticker)
        });
      }, 3000);
      return () => clearInterval(intervalId); // cleaning up when the user logged out
    }
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

  const stockInfo = (
    <React.Fragment>
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
    </React.Fragment>
  );

  return (
    stock.quantity > 0 ? (
      <React.Fragment>
        {gainSelect === 'todayGain' ? (
          <div className={todayGain[stock.ticker] && todayGain[stock.ticker].change > 0 ? "stock-item gain-positive" : "stock-item gain-negative"}>
            {stockInfo}
          </div>
        ) : (
            <div className={totalGain[stock.ticker] && totalGain[stock.ticker].totalGain > 0 ? "stock-item gain-positive" : "stock-item gain-negative"}>
              {stockInfo}
            </div>
          )}
      </React.Fragment>
    ) : <div>is this?</div>
  );
}

StockItem.propTypes = {

}

export default StockItem;
