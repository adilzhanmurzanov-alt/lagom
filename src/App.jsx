import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import GetStarted from "./screens/GetStarted";
import Home from "./screens/Home";
import Store from "./screens/Store";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import Assistant from "./screens/Assistant";
import Favorites from "./screens/Favorites";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store/:category" element={<Store />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
