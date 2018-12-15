import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { testPoints } from "./inputData";

ReactDOM.render(
  <App initialPoints={testPoints} />,
  document.getElementById("root"),
);
