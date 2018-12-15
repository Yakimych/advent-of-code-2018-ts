import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { initialPoints } from "./inputData";

ReactDOM.render(
  <App initialPoints={initialPoints} />,
  document.getElementById("root"),
);
