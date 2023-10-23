import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getUserCartThunk, removeWatchFromCartThunk, deleteCartThunk } from "../../store/cart";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const history = useHistory();
  console.log("this is cart from frontend", cart)

  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutComplete, setCheckoutComplete] = useState(false);


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
    if (cart && cart.watches.length > 0) {
        dispatch(deleteCartThunk());
      }
    dispatch(deleteCartThunk());
  };

  const handleCheckout = () => {
    if (cart && cart.watches.length > 0) {
        dispatch(deleteCartThunk());
      }
    setCheckoutComplete(true);
    alert("Checkout Successful!")
    setTimeout(() => {
      history.push('/');
    }, 3000);
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
      {/* {checkoutComplete ? (
        <p>Congratulations, Enjoy your purchase!</p>
      ) : ( */}
        <button onClick={handleCheckout}>Checkout</button>
      {/* )} */}
    </div>
  );
}

export default UserCart;