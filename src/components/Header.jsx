import React, { useEffect, useState } from "react";
import logo from "../images/react.png";
import "../css/Header.css";
import { FaBasketShopping } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Badge from "@mui/material/Badge";
import { getBasketFromStorage, setDrawer } from "../store/basket/basketSlice";
import { useDispatch } from "react-redux";
import { setSearchTermInHeader } from "../store/product-store/ProductSlice";

export default function Header() {
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productAmountInTheBasket = getBasketFromStorage().length;

  const changeTheme = () => {
    const root = document.getElementById("root");
    setTheme(!theme);
    if (theme) {
      root.style.backgroundColor = "white";
      root.style.color = "black";
    } else {
      root.style.backgroundColor = "black";
      root.style.color = "white";
    }
  };
  return (
    <div className="header-main">
      <div className="effective-flex-row">
        <img
          className="logo"
          src={logo}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <p className="logo-text">E-COMMERCE APP WİTH REACT</p>
      </div>

      <div className="effective-flex-row">
        <input
          className="search-box"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setTimeout(
              () => dispatch(setSearchTermInHeader(e.target.value)),
              700
            );
          }}
        />
        <div className="theme-and-basket">
          {theme ? (
            <FiSun className="icon" onClick={changeTheme} />
          ) : (
            <FaMoon className="icon" onClick={changeTheme} />
          )}
          <Badge
            badgeContent={productAmountInTheBasket}
            color="error"
            onClick={() => {
              dispatch(setDrawer());
            }}
          >
            <FaBasketShopping className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}
