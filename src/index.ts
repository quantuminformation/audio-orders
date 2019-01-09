import { domains, OrderSelector } from "./definitions/domains";
import { waitForElement } from "./waitForElement";
//import wait from "wait-for-element";

//declare var wait: any;

export class AudioOrders {
  /**
   * @param config you can override this
   */
  constructor() {
    const currentHref = window.location.href;
    const currentOrderSelector = domains.get(currentHref);
    if (currentOrderSelector) {
      console.table(currentOrderSelector);

      waitForElement(currentOrderSelector.orderTableSelector, 8000)
        .then(element => {
          this.addObserverForTrades(currentOrderSelector);
        })
        .catch(console.error.bind(console));
    } else {
      console.log("no trades to be monitored");
    }
  }

  /**
   * this is the heart ond soul of the assertions
   */
  addObserverForTrades(orderSelector: OrderSelector) {
    let targetElement = document.querySelector(
      orderSelector.orderTableSelector
    );
    console.log(targetElement);
    let observer = new MutationObserver(mutations => {
      mutations.forEach((mutationRecord: MutationRecord) => {
        console.log(mutationRecord.type);
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
              console.log(addedRow);
              const newOrder = addedRow.querySelector(".col-currency");
              console.log(newOrder.textContent);
              //playAudio()

              console.log(chrome)
              new Audio(chrome.extension.getURL("up.mp3")).play();



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

    // this is the only place where observe is called so we can track them here too to disconnect
    observer.observe(targetElement, config);
  }
}

var x: HTMLAudioElement = document.getElementById(
  "upAudio"
) as HTMLAudioElement;

function playAudio() {
  x.play();
}

new AudioOrders();
