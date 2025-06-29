function interceptData() {
  var xhrOverrideScript = document.createElement("script")
  xhrOverrideScript.type = "text/javascript"
  xhrOverrideScript.src = chrome.runtime.getURL("assets/interceptor.js")
  document.head.prepend(xhrOverrideScript)
}
function checkForDOM() {
  if (document.body && document.head) {
    interceptData()
  } else {
    requestIdleCallback(checkForDOM)
  }
}

function getInterceptedData() {
  const interceptedDataDiv = document.getElementById("__interceptedData")
  if (interceptedDataDiv) {
    return interceptedDataDiv.textContent
  }
  return null
}

requestIdleCallback(checkForDOM)
