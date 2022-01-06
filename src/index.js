import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AdoptProvider } from "./Context/Context";

ReactDOM.render(
  <React.StrictMode>
    <AdoptProvider>
      <App />
    </AdoptProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
