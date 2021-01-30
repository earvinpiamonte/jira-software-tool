/* Background script */
/* https://developer.chrome.com/docs/extensions/mv2/background_pages/ */

// #issuekey-val or #key-val element must be present for the popup to show
const rules = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#issuekey-val"], // issue on board (self-hosted)
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#key-val"], // issue on page (selft-hosted)
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#jira-issue-header"], // issue header (cloud)
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
