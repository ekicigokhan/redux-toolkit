import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/product-store/ProductSlice";
import Product from "./Product";
import "../css/ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, searchTerm } = useSelector((state) => state.productStore); //returns initialState object

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="product-list">
        {(searchTerm ? filteredProducts : products).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
