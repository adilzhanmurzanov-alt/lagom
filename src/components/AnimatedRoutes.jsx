import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GetStarted from "../screens/GetStarted";
import Home from "../screens/Home";
import Store from "../screens/Store";
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import Assistant from "../screens/Assistant";
import Favorites from "../screens/Favorites";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

function Page({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: "100svh" }}
    >
      {children}
    </motion.div>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><GetStarted /></Page>} />
        <Route path="/home" element={<Page><Home /></Page>} />
        <Route path="/store/:category" element={<Page><Store /></Page>} />
        <Route path="/product/:id" element={<Page><Product /></Page>} />
        <Route path="/cart" element={<Page><Cart /></Page>} />
        <Route path="/checkout" element={<Page><Checkout /></Page>} />
        <Route path="/assistant" element={<Page><Assistant /></Page>} />
        <Route path="/favorites" element={<Page><Favorites /></Page>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
