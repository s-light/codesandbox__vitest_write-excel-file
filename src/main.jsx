import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Example from "./example.jsx";

console.log(document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Example />
  </StrictMode>
);
