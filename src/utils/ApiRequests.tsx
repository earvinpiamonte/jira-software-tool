const getManifest = async () => {
  if (typeof chrome.runtime.getManifest === "function") {
    console.log("Loaded manifest from chrome.runtime.");
    return chrome.runtime.getManifest();
  }

  const manifestData = await fetch(`${process.env.PUBLIC_URL}/manifest.json`)
    .then((response) => response.json())
    .catch(() => {
      console.log("Error getting manifest data.");
    });
  console.log("Loaded manifest from file.");
  return manifestData;
};

export { getManifest };
