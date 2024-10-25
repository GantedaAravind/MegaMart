import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
// import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "#28a745", // A modern green for success
            color: "#fff", // White text for contrast
            padding: "8px", // Comfortable padding
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            fontSize: "16px",
          },
        },
        error: {
          style: {
            background: "#dc3545", // A modern red for errors
            color: "#fff", // White text for contrast
            padding: "8px", // Comfortable padding
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            fontSize: "16px", // Readable font size
          },
        },
      }}
    />
  </Provider>
  // </React.StrictMode>
);
