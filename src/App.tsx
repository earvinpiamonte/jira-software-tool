import React from "react";

import useTheme from "./hooks/useTheme";
import useChromeManifest from "./hooks/useChromeManifest";

const App = ({ page }: { page: string }) => {
  useTheme();

  const manifest = useChromeManifest();

  const Page = React.lazy(
    () => import(`./pages/${page}`).catch((err) => null) // Oh no I hope I don't fall
  );

  return (
    <React.Suspense fallback={null}>
      <Page manifest={manifest} />
    </React.Suspense>
  );
};

export default App;
