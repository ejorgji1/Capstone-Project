import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./UserCart.css"
import { getUserCartThunk, removeWatchFromCartThunk, deleteCartThunk } from "../../store/cart";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const history = useHistory();
  

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
    }, 2000);
  };

  if (!user) {
    return <div className="cart-messages">Please log in to view your cart.</div>;
  }

  if (!cart) {
    return <div className="cart-messages">Your cart is empty.</div>;
  }

  return (
    <div class="cart-container">
      <h2 class="cart-header">Your Cart</h2>
      {cart.watches.map((watch) => (
        // <div key={watch.id} className="cart-item">
        //  <img src={watch.image_url} alt={`Image of ${watch.model_name}`} />
        //   <p>{watch.model_name}</p>
        //   <p>Price: ${watch.price}</p>
        //   <button onClick={() => handleRemoveWatch(watch.id)}>Remove Watch</button>
        // </div>
        <div key={watch.id} className="cart-item">
  <div className="cart-item-info">
  <img src={watch.image_url} alt={`Image of ${watch.model_name}`} />
    <div className="cart-item-text">
    <p>{watch.model_name}</p>
    <p>Price: ${watch.price}</p>
    <button onClick={() => handleRemoveWatch(watch.id)}>Remove Watch</button>
    </div>
  </div>
</div>
      ))}
      {cart.watches.length > 0 && (
       <div className="cart-total-container">
       <div className="cart-total-image-container">
          <i class="fa-solid fa-cart-shopping cart-total-logo"></i>
            </div>
      
        <div className="cart-total-info-container">
      <p className="total-price">Total Price: ${totalPrice}</p>
      <button className="delete-cart" onClick={handleDeleteCart}>Delete Cart</button>
      {/* {checkoutComplete ? (
        <p>Congratulations, Enjoy your purchase!</p>
      ) : ( */}
        <button className="checkout" onClick={handleCheckout}>Checkout</button>
      
          
        </div>
        </div>
      )}
    </div>
  );
}

export default UserCart;