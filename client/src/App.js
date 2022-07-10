import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./styles/Layout";

import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" exact element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
