safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);
safari.application.addEventListener("message", handleMessage, false);


function performCommand(event) {
  if (event.command === "openInSuperOTR") {
    var url = event.target.browserWindow.activeTab.url;
    var title = event.target.browserWindow.activeTab.title;
  }
  else if (event.command === "openInSuperOTRMenu") {
    var url = safari.application.activeBrowserWindow.activeTab.url;
    var title = safari.application.activeBrowserWindow.activeTab.title;
    if (event.userInfo) {
      title = event.userInfo.selection;
    }
  }
  else if (event.command === "openLinkInSuperOTR") {
    var url = event.userInfo.href;
    var title = event.userInfo.selection;
  }
  openURLinSuperOTR(url, title);
}


function openURLinSuperOTR(url, title) {
  var superotrURL = 'otr://'+url//url/' + encodeURIComponent(url)// + '&title=' + encodeURIComponent(title);
  safari.application.activeBrowserWindow.activeTab.url = superotrURL;
}


function validateCommand(event) {
  if (event.command === "openInSuperOTR") {
    event.target.disabled = !event.target.browserWindow.activeTab.url;
  }
  if (event.command === "openInSuperOTRMenu") {
    event.target.disabled = event.userInfo.hasLink;
  }
  if (event.command === "openLinkInSuperOTR") {
    event.target.disabled = !event.userInfo.hasLink;
  }
}


function handleMessage(event) {
  if (event.name == 'openInSuperOTRViaKeyboardShortcut') {
    url = event.target.browserWindow.activeTab.url;
    title = event.target.browserWindow.activeTab.title;

    if (event.message) {
      title = event.message;
    }
    openURLinSuperOTR(url, title);
  }
  if (event.name == 'getSettingValue') {
    var value = safari.extension.settings.getItem(event.message);
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("settingValueIs", [event.message, value]);
  }
}
