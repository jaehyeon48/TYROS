import React from 'react';
import PropTypes from 'prop-types'

const StockItem = ({
  stock
}) => {
  return (
    stock.quantity > 0 ? (
      <div className="stock-item">
        <div className="stock-item-ticker">
          {stock.ticker.toUpperCase()}
        </div>
        <div className="stock-item-realtime"></div>
        <div className="stock-item-avgCost">
          Avg.Cost: {stock.avgCost}
        </div>
        <div className="stock-item-quantity">
          Quantity: {stock.quantity}
        </div>
        <div className="stock-item-todayGain"></div>
        <div className="stock-item-totalGain"></div>
      </div>
    ) : null
  );
}

StockItem.propTypes = {

}

export default StockItem;
