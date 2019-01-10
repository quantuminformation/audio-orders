export function waitForElement(selector, timeout) {
  var _resolve, _reject;
  var promise = new Promise(function(resolve, reject) {
    _resolve = resolve;
    _reject = reject;
  });

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        if (!document.querySelector(".trades table tbody")) {
          return;
        }

        //   console.log('type: ' + mutation.type)

        let addedNode = mutation.addedNodes[i] as HTMLElement;
        // console.log('matces?: ' + addedNode.matches)

        if (addedNode.matches && addedNode.matches(selector)) {
          console.log("found " + selector);
        }
        console.log("className: " + addedNode.className);
        if (addedNode.className !== ".trades") {
          return;
        }

        if (
          typeof addedNode.matches === "function" &&
          addedNode.matches(selector)
        ) {
          _resolve(addedNode);
          observer.disconnect();
          clearTimeout(timerId);
        }
      }
    });
  });
  // first time check
  var element = document.querySelector(selector);
  if (element != null) {
    _resolve(element);
    return promise;
  }
  var timeoutOption = timeout || 2000; // 2s
  // start
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  // timeout
  var timerId = setTimeout(function() {
    _reject(new Error("Not found element match the selector:" + selector));
    observer.disconnect();
  }, timeoutOption);

  return promise;
}
