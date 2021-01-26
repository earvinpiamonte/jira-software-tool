/* Background script */
/* https://developer.chrome.com/docs/extensions/mv2/background_pages/ */

// #issuekey-val or #key-val element must be present for the popup to show
const rules = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#issuekey-val"],
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#key-val"],
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

chrome.runtime.onInstalled.addListener((details) => {
  console.log(details);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rules]);
  });
});

export {};
