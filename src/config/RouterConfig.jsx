import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../components/ProductDetail";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" index="true" element={<Home />}></Route>
      <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
    </Routes>
  );
}
