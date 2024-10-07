import React, { useEffect } from "react";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBasket,
  removeProduct,
  setDrawer,
} from "./store/basket/basketSlice";
export default function App() {
  const { products, drawer, totalPrice } = useSelector(
    (state) => state.basketStore
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);
  return (
    <div>
      <PageContainer>
        <Loading />
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => {
            dispatch(setDrawer());
          }}
          className="drawer"
        >
          {products &&
            products.map((product) => (
              <div key={product.id} className="basket-list">
                <div className="product-image">
                  <img src={product.image} width={50} height={50} alt="" />
                </div>
                <div className="product-info">
                  <p>{product.title}</p>
                  <h5>Amount : ({product.count})</h5>
                  <h6>Unit price : {product.price}</h6>
                  <h3>${product.count * product.price}</h3>
                  <button
                    className="remove-button"
                    onClick={() => {
                      dispatch(removeProduct(product.id));
                      dispatch(calculateBasket());
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <div style={{ marginLeft: "25px" }}>
            <h5>Total price : ${totalPrice.toFixed(2)}</h5>
          </div>
        </Drawer>
        <Header />
        <RouterConfig />
      </PageContainer>
    </div>
  );
}
