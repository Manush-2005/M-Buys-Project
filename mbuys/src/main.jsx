import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NavBar from "./Componets/NavBar.jsx";
import Footer from "./Componets/Footer.jsx";
import store from "./Store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      
      <App />
      <Footer />
    </Provider>
  </React.StrictMode>
);
