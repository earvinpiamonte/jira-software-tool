import React from "react";

import GetManifestWithChrome from "./utils/GetManifestWithChrome";

const App = ({ page }: { page: string }) => {
  const Component = React.lazy(
    () => import(`./pages/${page}`).catch((err) => null) // catch but I hope I don't fall
  );

  const manifest = GetManifestWithChrome();

  return (
    <React.Suspense fallback={null}>
      <Component manifest={manifest} />
    </React.Suspense>
  );
};

export default App;
