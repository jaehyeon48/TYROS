export default function organizeShare(ticker, shareInfo) {
  shareInfo.sort((a, b) => (a.transactionType < b.transactionType) ? 1 : ((b.transactionType < a.transactionType) ? -1 : 0));
  const share = {};
  let totalCost = 0;
  let totalQty = 0;
  share.ticker = ticker;


  let sellQty = 0;
  shareInfo.forEach(share => {
    if (share.transactionType === 'sell') {
      sellQty += share.quantity;
    }
    else if (share.transactionType === 'buy') {
      const shareQty = share.quantity - sellQty;
      if (shareQty > 0) {
        totalCost += share.pricePerShare * shareQty;
        totalQty += shareQty;
        sellQty = 0;
      } else if (shareQty < 0) {
        sellQty = -shareQty;
      } else {
        sellQty = 0;
      }
    }
  });


  share.avgCost = (totalQty <= 0 ? 0 : (totalCost / totalQty).toFixed(2));
  share.quantity = (totalQty <= 0 ? 0 : totalQty);

  return share;
}