import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Transaltion
import "./utils/i18n";

// Redux
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
