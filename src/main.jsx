import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/theme.css";
import { FavoriteProvider } from "./context/FavoriteContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <FavoriteProvider>
            <App />
          </FavoriteProvider>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
