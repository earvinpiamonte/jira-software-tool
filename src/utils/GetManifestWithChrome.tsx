import { getManifest } from "./ApiRequests";

// Get manifest data via `chrome`
const GetManifestWithChrome = async () => {
  if (typeof chrome.runtime.getManifest === "function") {
    console.log("Loaded manifest from chrome.runtime.");
    return chrome.runtime.getManifest();
  }

  // Fall back to `fetch`
  return await getManifest();
};

export default GetManifestWithChrome;
