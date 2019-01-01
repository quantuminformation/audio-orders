import {domains, OrderSelector} from './definitions/domains'

export class AudioOrders {

    /**
     * @param config you can override this
     */
    constructor() {
        const currentLocation = window.location
        const currentOrderSelector = domains.get(currentLocation)
        this.addObserverForTrades(currentOrderSelector)
    }


    /**
     * this is the heart ond soul of the assertions
     */
    addObserverForTrades(orderSelector: OrderSelector) {
        let targetElement = document.querySelector(orderSelector.orderTableSelector)
        console.log(targetElement)
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutationRecord: MutationRecord) => {

                switch (mutationRecord.type) {
                    case 'characterData':
                        let target = mutationRecord.target as HTMLElement

                        if (!target.parentElement.id
                        ) {
                            return
                        }
                        return
                    case 'childList':
                        return
                    default:
                        console.log(`something went wrong`)
                }

            })
        })
        let config = {attributes: true, childList: true, characterData: true, subtree: true}

        // this is the only place where observe is called so we can track them here too to disconnect
        observer.observe(targetElement, config)

    }

}
