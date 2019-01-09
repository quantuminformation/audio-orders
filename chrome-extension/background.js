chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
      response
    ) {
      console.log(response.farewell);
    });
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.executeScript(
        tab.id,
        { file: "./bundle.js" },
        function() {
          let error = chrome.runtime.lastError;
          if (error) console.log(error);
        }
      );
    });
  });
});


createNotification();
audioNotification();

function audioNotification(){
  var yourSound = new Audio('up.mp3');
  yourSound.play();
}

function createNotification(){
  var opt = {type: "basic",title: "Your Title",message: "Your message",iconUrl: "your_icon.png"}
  chrome.notifications.create("notificationName",opt,function(){});

  //include this line if you want to clear the notification after 5 seconds
  setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}