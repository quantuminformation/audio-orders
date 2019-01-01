export type OrderSelector = {
    orderTableSelector: string
    orderRowSelector: string
}

export const orderTableSelector = '.trades table tbody'
export const orderRowSelector = '.col-currency'

const binanceURL = 'bitfinex.com'

const binanceOrderSelector: OrderSelector = {
    orderTableSelector: '.trades table tbody',
    orderRowSelector: '.col-currency'
}

export const domains = new Map()
domains.set(binanceURL, binanceOrderSelector)