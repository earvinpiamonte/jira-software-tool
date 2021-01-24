/* Background script */
/* https://developer.chrome.com/docs/extensions/mv2/background_pages/ */

const rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#issuekey-val"], // #issuekey-val element must be present for the popup to show
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

chrome.runtime.onInstalled.addListener((details) => {
  console.log(details);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});
