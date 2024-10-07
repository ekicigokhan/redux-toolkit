import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../store/product-store/ProductSlice";
import "../css/ProductDetail.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from "../store/basket/basketSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image, title, description, category, price } = useSelector(
    (state) => state.productStore.selectedProduct
  );

  const [count, setCount] = useState(1);

  const addBasket = () => {
    const product = {
      id,
      price,
      title,
      image,
      description,
      count: count,
    };
    if (count <= 0) {
      window.alert("Please increase product amount !");
    } else {
      dispatch(addToBasket(product));
      dispatch(calculateBasket());
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div>
      <div className="product-detail">
        <div>
          <img className="product-detail-image" src={image} alt={title} />
        </div>
        <div>
          <p>Category : {category}</p>
          <p>{title}</p>
          <p>{description}</p>
          <h3>{price} ₺</h3>
          <div>
            <IoIosAddCircleOutline
              size={30}
              cursor={"pointer"}
              onClick={() => {
                setCount(count + 1);
              }}
            />
            <span style={{ fontSize: "40px", margin: "0 5px" }}>{count}</span>
            <CiCircleMinus
              size={30}
              cursor={"pointer"}
              onClick={() => {
                setCount(count - 1);
              }}
            />
          </div>
          <button className="add-to-basket-button" onClick={addBasket}>
            Add to basket
          </button>
        </div>
      </div>
    </div>
  );
}
