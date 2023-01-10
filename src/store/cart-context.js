import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  cartIsShown: false,
  onClose: () => {},
  onShow: () => {},
  cartClear: () => {},
});

export default CartContext;
