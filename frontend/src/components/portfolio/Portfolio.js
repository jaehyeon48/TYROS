import React from 'react'

const Portfolio = ({
  portfolio
}) => {
  return (
    <div className="portfolios-item">
      <div className="portfolios-item__name">{portfolio.name}</div>
    </div>
  )
}

export default Portfolio;
