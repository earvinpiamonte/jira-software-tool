import React from "react";

import ThemeProvider from "./providers/ThemeProvider";
import useChromeManifest from "./hooks/useChromeManifest";

const App = ({ page }: { page: string }) => {
  const manifest = useChromeManifest();

  const Page = React.lazy(
    () => import(`./pages/${page}`).catch((err) => null) // Oh no I hope I don't fall
  );

  return (
    <ThemeProvider>
      <React.Suspense fallback={null}>
        <Page manifest={manifest} />
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
