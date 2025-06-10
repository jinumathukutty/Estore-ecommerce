// src/constants/appRoutes.ts
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages/components
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ShoppingCart from "../pages/shoppingcart/ShoppingCart";
import WishList from "../pages/wishlist/WishList";
import AboutUs from "../pages/aboutus/AboutUs";
import ContactUs from "../pages/contactus/ContactUs";
import ProductDetail from "../pages/productdetail/ProductDetail";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import ForgotPassword from "../pages/auth/forgotpassword/ForgotPassword";
import Checkout from "../pages/checkout/Checkout";

const appRoutes = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product/:productId",
  SHOPPINGCART: "/shoppingcart",
  WISHLIST: "/wishlist",
  ABOUTUS: "/aboutus",
  CONTACTUS: "/contactus",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOTPASSWORD: "/auth/forgotpassword",
  CHECKOUT: "/checkout",
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path={appRoutes.PRODUCTS} element={<Products />} />
        <Route path={appRoutes.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={appRoutes.SHOPPINGCART} element={<ShoppingCart />} />
        <Route path={appRoutes.WISHLIST} element={<WishList />} />
        <Route path={appRoutes.ABOUTUS} element={<AboutUs />} />
        <Route path={appRoutes.CONTACTUS} element={<ContactUs />} />
        <Route path={appRoutes.LOGIN} element={<Login />} />
        <Route path={appRoutes.SIGNUP} element={<Signup />} />
        <Route path={appRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path={appRoutes.CHECKOUT} element={<Checkout />} />
      </Routes>
    </Router>
  );
};
