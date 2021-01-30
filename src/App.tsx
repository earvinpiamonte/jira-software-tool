import React from "react";

import GetManifestWithChrome from "./utils/GetManifestWithChrome";

import Popup from "./pages/Popup";
import Options from "./pages/Options";
import Test from "./pages/Test";

const App = (props: any) => {
  const { page } = props;
  const [manifest, setManifest] = React.useState({});

  const loadManifest = async () => {
    const manifestData = await GetManifestWithChrome();
    setManifest(manifestData);
  };

  React.useEffect(() => {
    loadManifest();
  }, []);

  // check what page is requested base on `page` props passed from `index.js`
  switch (page) {
    case "popup":
      return <Popup {...{ manifest, ...props }} />;
    case "options":
      return <Options {...{ manifest, ...props }} />;
    case "test":
      return process.env.NODE_ENV === "development" ? (
        <Test />
      ) : (
        <Options {...{ manifest, ...props }} />
      );
    // return default page - Options page
    default:
      return <Options {...{ manifest, ...props }} />;
  }
};

export default App;
