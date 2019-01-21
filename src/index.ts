import { domains, OrderSelector } from "./definitions/domains";

export class AudioOrders {
  /**
   * @param config you can override this
   */

  defaultTradeNotificationSize = 10;
  defaultTradeNotificationSizeBig = 100;
  constructor() {
    const currentHref = window.location.href;
    const currentOrderSelector = domains.get(currentHref);
    if (currentOrderSelector) {
      console.log(`Found ${currentOrderSelector.name}, happy listening!`);

      if (document.querySelector(currentOrderSelector.orderTableSelector)) {
        this.addObserverForTrades(currentOrderSelector); // already on page before extension loads
      } else {
        elementReady(currentOrderSelector.orderTableSelector)
          .then(element => {
            this.addObserverForTrades(currentOrderSelector);
          })
          .catch(console.error.bind(console));
      }
    } else {
      console.log("no trades to be monitored");
    }

    console.log(`Your orders to be notified of are above ${this.defaultTradeNotificationSizeBig} (big order) and ${this.defaultTradeNotificationSize} BTC`)
  }

  addObserverForTrades(orderSelector: OrderSelector) {
    let targetElement = document.querySelector(
      orderSelector.orderTableSelector
    );
    let observer = new MutationObserver(mutations => {
      mutations.forEach((mutationRecord: MutationRecord) => {
        switch (mutationRecord.type) {
          case "characterData":
            let target = mutationRecord.target as HTMLElement;

            if (!target.parentElement.id) {
              return;
            }
            return;
          case "childList":
            if (mutationRecord.addedNodes.length) {
              const addedRow = mutationRecord.addedNodes[0] as HTMLElement;
              const newOrder = Number(
                addedRow.querySelector(".col-currency").textContent
              );
              const isBuy = !!addedRow.querySelector(".fa-chevron-up");

              if (newOrder >= this.defaultTradeNotificationSizeBig) {
                new Audio(
                  chrome.runtime.getURL(
                    isBuy ? "audio/upBig.mp3" : "audio/downBig.mp3"
                  )
                ).play();
              } else if (newOrder >= this.defaultTradeNotificationSize) {
                new Audio(
                  chrome.runtime.getURL(
                    isBuy ? "audio/up.mp3" : "audio/down.mp3"
                  )
                ).play();
              }
            }
            return;
          default:
            console.log(`something went wrong`);
        }
      });
    });
    let config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

    observer.observe(targetElement, config);
  }
}

new AudioOrders();

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady(selector) {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(selector);
    if (el) {
      resolve(el);
    }
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach(element => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  });
}
