import { createSlice } from "@reduxjs/toolkit";

export const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalPrice: 0,
};

const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct =
        state.products &&
        state.products.find((product) => product.id == action.payload.id);
      if (findProduct) {
        findProduct.count += action.payload.count;
        state.products = [...state.products];
        writeFromBasketToStorage(state.products);
      } else {
        state.products = [...state.products, action.payload];
        writeFromBasketToStorage(state.products);
      }
    },
    removeProduct: (state, action) => {
      state.products =
        state.products &&
        state.products.filter((product) => product.id !== action.payload);

      writeFromBasketToStorage(state.products);
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    calculateBasket: (state) => {
      state.totalPrice = 0;
      state.products &&
        state.products.map((product) => {
          state.totalPrice += product.price * product.count;
        });
    },
  },
  extraReducers: (builder) => {},
});

export const { addToBasket, setDrawer, calculateBasket, removeProduct } =
  basketSlice.actions;

export default basketSlice.reducer;
