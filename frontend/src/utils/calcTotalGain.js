export const calcTotalGain = (realTimePrice, avgCost, totalQty) => {
  const totalGain = ((realTimePrice - avgCost) * totalQty).toFixed(2);
  const totalGainPercent = (totalGain / (avgCost * totalQty) * 100).toFixed(3);

  return { totalGain, totalGainPercent };
}