import React from "react";

import ErrorBoundary from "./boundaries/ErrorBoundary";
import ThemeProvider from "./providers/ThemeProvider";
import useChromeManifest from "./hooks/useChromeManifest";

const App = ({ page = "Options" }: { page: string }) => {
  const manifest = useChromeManifest();
  const Page = React.lazy(() => import(`./pages/${page}`));

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <React.Suspense fallback={null}>
          <Page manifest={manifest} />
        </React.Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
