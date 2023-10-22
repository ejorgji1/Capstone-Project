import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCartThunk, removeWatchFromCartThunk, deleteCartThunk } from "../../store/cart";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  console.log("this is cart from frontend", cart)

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(getUserCartThunk());
    }
  }, [dispatch, user]);

  const calculateTotalPrice = () => {
    if (cart) {
      const total = cart.watches.reduce((acc, watch) => acc + watch.price, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };
   
  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);
 

  const handleRemoveWatch = (watchId) => {

    dispatch(removeWatchFromCartThunk(watchId));
    calculateTotalPrice()
  };

  const handleDeleteCart = () => {
    dispatch(deleteCartThunk());
  };

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  if (!cart) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.watches.map((watch) => (
        <div key={watch.id}>
         <img src={watch.image_url} alt={`Image of ${watch.model_name}`} />
          <p>{watch.model_name}</p>
          <p>Price: ${watch.price}</p>
          <button onClick={() => handleRemoveWatch(watch.id)}>Remove Watch</button>
        </div>
      ))}
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handleDeleteCart}>Delete Cart</button>
    </div>
  );
}

export default UserCart;