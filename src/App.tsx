import React from "react";

import ThemeProvider from "./providers/ThemeProvider";
import useChromeManifest from "./hooks/useChromeManifest";

const App = ({ page }: { page: string }) => {
  const manifest = useChromeManifest();

  const Page = React.lazy(
    () => import(`./pages/${page}`).catch((err) => null) // Oh no I hope I don't fall
  );

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider>
        <Page manifest={manifest} />
      </ThemeProvider>
    </React.Suspense>
  );
};

export default App;
