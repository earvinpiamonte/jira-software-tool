import React from "react";

// Get manifest data via `chrome`
const GetManifestWithChrome = () => {
  const [manifest, setManifest] = React.useState();

  const loadManifest = async () => {
    const manifestData =
      typeof chrome.runtime.getManifest === "function"
        ? chrome.runtime.getManifest()
        : // Fallback to get manifest via `fetch` if `chrome.runtime.getManifest` is undefined
          await import("./ApiRequests").then(({ getManifest }) =>
            getManifest()
          );
    setManifest(manifestData);
  };

  React.useEffect(() => {
    loadManifest();
  }, []);

  return manifest;
};

export default GetManifestWithChrome;
