import React from "react";
import "../css/Product.css";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { id, title, image, price } = product;
  return (
    <div className="card">
      <img className="image" src={image} alt="" />
      <div>
        <p className="title">{title}</p>
        <h3 className="price">${price}</h3>
      </div>
      <div className="detail-button">
        <Link to={`/product-detail/${id}`}>
          <button className="detail">Go to detail</button>
        </Link>
      </div>
    </div>
  );
}
