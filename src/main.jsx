import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
