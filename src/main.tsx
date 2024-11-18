import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./context/LoginContext.tsx";
import { ShopingCartProvider } from "./context/ShopingCartContext.tsx";


createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
    <LoginProvider>
      <ShopingCartProvider>
      <App />
      </ShopingCartProvider>
      </LoginProvider >
    </BrowserRouter>
  </>
);
