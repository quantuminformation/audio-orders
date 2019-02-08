export type OrderSelector = {
  orderTableSelector: string;
  orderRowSelector: string;
  name: string;
};
export type NotificationSize = {
  normal: number;
  big: number;
};

const notificationSizeXRP: NotificationSize = {
  normal: 5000,
  big: 50000
};
const notificationSizeBTC: NotificationSize = {
  normal: 10,
  big: 100
};
const notificationSizeLTC: NotificationSize = {
  normal: 500,
  big: 5000
};

const binanceBTCUSD = "https://www.bitfinex.com/t/BTC:USD";
const binanceLTCUSD = "https://www.bitfinex.com/t/LTC:USD";
const binanceXRPUSD = "https://www.bitfinex.com/t/XRP:USD";

const binanceOrderSelector: OrderSelector = {
  orderTableSelector: ".trades table tbody",
  orderRowSelector: ".col-currency",
  name: "Binance"
};
export type OrderSelectorNotificationSize = {
  orderSelector: OrderSelector;
  NotificationSize: NotificationSize;
  CurrencyInfo: string;
};

export const domains = new Map<string, OrderSelectorNotificationSize>();
domains.set(binanceBTCUSD, {
  orderSelector: binanceOrderSelector,
  NotificationSize: notificationSizeBTC,
  CurrencyInfo: "BTC"
});
domains.set(binanceLTCUSD, {
  orderSelector: binanceOrderSelector,
  NotificationSize: notificationSizeLTC,
  CurrencyInfo: "LTC"
});
domains.set(binanceXRPUSD, {
  orderSelector: binanceOrderSelector,
  NotificationSize: notificationSizeXRP,
  CurrencyInfo: "XRP"
});
