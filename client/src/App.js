import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Layout from "./styles/Layout";

import MainPage from "./pages/MainPage";
import ErrorFallback from "./pages/ErrorFallback";

const App = () => {
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" exact element={<MainPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
};

export default App;
