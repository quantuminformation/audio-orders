export type OrderSelector = {
  orderTableSelector: string;
  orderRowSelector: string;
};

export const orderTableSelector = ".trades table tbody";
export const orderRowSelector = ".col-currency";

const binanceURL = "https://www.bitfinex.com/t/BTC:USD";

const binanceOrderSelector: OrderSelector = {
  orderTableSelector: ".trades table tbody",
  orderRowSelector: ".col-currency"
};

export const domains = new Map<string, OrderSelector>();
domains.set(binanceURL, binanceOrderSelector);
