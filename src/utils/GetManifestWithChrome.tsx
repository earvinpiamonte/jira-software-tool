// Get manifest data via `chrome`
const GetManifestWithChrome = () => {
  return typeof chrome.runtime.getManifest === "function"
    ? chrome.runtime.getManifest()
    : // Fallback to get manifest via `fetch` if `chrome.runtime.getManifest` is undefined
      import("./ApiRequests").then(({ getManifest }) => getManifest());
};

export default GetManifestWithChrome;
