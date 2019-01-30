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
  normal: 1000,
  big: 10000
};
const notificationSizeBTC: NotificationSize = {
  normal: 10,
  big: 100
};

const binanceBTCUSD = "https://www.bitfinex.com/t/BTC:USD";
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
domains.set(binanceXRPUSD, {
  orderSelector: binanceOrderSelector,
  NotificationSize: notificationSizeXRP,
  CurrencyInfo: "XRP"
});
