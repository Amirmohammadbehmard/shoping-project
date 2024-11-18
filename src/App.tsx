import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";
import Layout from "./components/layout/Layout";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import { ShopingCartProvider } from "./context/ShopingCartContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Login from "./pages/login/Login";
import LoginProvider, { useLoginContext } from "./context/LoginContext";
import Contact from "./pages/contact/Contact";

function App() {
  const { isLogin } = useLoginContext();
  return (
    <LoginProvider>
      <ShopingCartProvider>
        <Layout>
          <Routes>
            <Route path="/shoping-project" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/login"
              element={isLogin ? <Navigate to={"/cart"} /> : <Login />}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Layout>
      </ShopingCartProvider>
    </LoginProvider>
  );
}

export default App;
