import { OrderSelectorNotificationSize } from "./definitions/domains";
import network = chrome.privacy.network;

export class EtoroWatcher {
  field1: number = 1;
  constructor() {}

  addObserverForPercentageTradeProfit() {
    let targetElement = document.querySelector(
      "w-instrument-invested-stats-change"
    );

    let initialValue = 1;

    let observer = new MutationObserver(mutations => {
      mutations.forEach((mutationRecord: MutationRecord) => {
        switch (mutationRecord.type) {
          case "characterData":
            let target = mutationRecord.target as HTMLSpanElement;
            const newValue = parseInt(target.innerText);

            // 1% increase
            if (newValue - initialValue > 1) {
              new Audio(chrome.runtime.getURL("audio/good.mp3")).play();
            }

            return;
          case "childList":
            if (mutationRecord.addedNodes.length) {
              const addedRow = mutationRecord.addedNodes[0] as HTMLElement;
              const newOrder = Number(
                addedRow.querySelector(".col-currency").textContent
              );
              const isBuy = !!addedRow.querySelector(".fa-chevron-up");
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
