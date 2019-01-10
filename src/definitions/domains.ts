export type OrderSelector = {
  orderTableSelector: string;
  orderRowSelector: string;
  name: string;
};

const binanceURL = "https://www.bitfinex.com/t/BTC:USD";

const binanceOrderSelector: OrderSelector = {
  orderTableSelector: ".trades table tbody",
  orderRowSelector: ".col-currency",
  name: "Binance"
};

export const domains = new Map<string, OrderSelector>();
domains.set(binanceURL, binanceOrderSelector);
