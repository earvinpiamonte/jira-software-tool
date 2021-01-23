import React from "react";

import { getManifest } from "./utils/ApiRequests";

import Popup from "./pages/Popup";
import Options from "./pages/Options";
import Test from "./pages/Test";

const App = ({ page }) => {
  const [manifest, setManifest] = React.useState();

  const loadManifest = async () => {
    const manifestData = await getManifest();
    setManifest(manifestData);
  };

  React.useEffect(() => {
    loadManifest();
  }, []);

  // check what page is requested base on `page` props passed from `index.js`
  switch (page) {
    case "popup":
      return <Popup manifest={manifest} />;
    case "options":
      return <Options manifest={manifest} />;
    case "test":
      return process.env.NODE_ENV === "development" ? (
        <Test />
      ) : (
        <Options manifest={manifest} />
      );
    // return default page - Options page
    default:
      return <Options manifest={manifest} />;
  }
};

export default App;
