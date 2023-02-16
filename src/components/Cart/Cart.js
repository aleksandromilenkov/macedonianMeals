import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ctx = useContext(CartContext);
  const hasItems = ctx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const onClearCart = () => {
    ctx.cartClear();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={Math.random()}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cancelOrderHandler = () => {
    props.onClose();
    setIsCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    setIsLoading(true);
    const resp = await fetch(
      "https://react-http-max-f7bf6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );

    setIsLoading(false);
    setShowSuccess(true);
    onClearCart();
  };
  const content = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout ? (
        <Checkout
          closeForm={() => setIsCheckout(false)}
          onCancel={cancelOrderHandler}
          onConfirm={submitOrderHandler}
        />
      ) : (
        <div className={classes.actions}>
          {ctx.totalAmount > 1 && (
            <button className={classes["button--alt"]} onClick={onClearCart}>
              Clear Cart
            </button>
          )}
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems ? (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
  const isLoadingContent = <p>Sending order data...</p>;

  const isSuccessContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !showSuccess && content}
      {isLoading && !showSuccess && isLoadingContent}
      {!isLoading && showSuccess && isSuccessContent}
    </Modal>
  );
};

export default Cart;
