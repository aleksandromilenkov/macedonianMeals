import React, { useContext, useEffect, useRef } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const btnRef = useRef();
  useEffect(() => {
    if (numberOfCartItems < 1) {
      return;
    }
    btnRef.current.classList.add(`${classes.bump}`);
    const timer = setTimeout(() => {
      btnRef.current.classList.remove(`${classes.bump}`);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [numberOfCartItems]);

  return (
    <button className={classes.button} onClick={props.onClick} ref={btnRef}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
