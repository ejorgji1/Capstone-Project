import React, {useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { getUserCartThunk } from '../../store/cart';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from "../../images/logo.png"


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart.cart)
	const dispatch = useDispatch();
	const location = useLocation();

	// useEffect(() => {
	// 	if (sessionUser && location.pathname !== '/cart') {
	// 	  dispatch(getUserCartThunk());
	// 	}
	//   }, [dispatch, sessionUser, location]);
	
	// useEffect(() => {
	// 	// Always fetch the cart data if the user is logged in
	// 	if (sessionUser) {
	// 	  dispatch(getUserCartThunk());
	// 	}
	//   }, [dispatch, sessionUser]);
	
	
	// // if (!cart) {
	// // 	return "Loading"
	// // }

	// const cartItemCount = cart?.watches.length || 0;

	  const [cartItemCount, setCartItemCount] = useState(0);

	
	  useEffect(() => {
		const newCartItemCount = cart?.watches.length || 0;
		setCartItemCount(newCartItemCount);
	  }, [cart]);
	
	  
	  useEffect(() => {
		if (sessionUser) {
		  dispatch(getUserCartThunk());
		} else {
		  setCartItemCount(0);
		}
	  }, [dispatch, sessionUser]);


	return (
		<div className="nav-container">
			<div className="nav-left">
        <NavLink exact to="/">
          <img className="small-logo" src={logo} alt="" />
        </NavLink>
      </div>
			{/* <li>
				<NavLink exact to="/">Home</NavLink>
			</li> */}
			{/* {location.pathname === '/' && ( */}
        <div className='searchbar'>
          <SearchBar />
        </div>
		<div className='right-nav'>
			 {/* )} */}
			{isLoaded && (
				<div className='user-button'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		<div className='cart-div'>
        <Link to='/cart'>
        <span class="material-symbols-outlined shopping-cart">
          shopping_cart
		  
        </span>
		<span>{cartItemCount}</span>
        {/* <div className="cart-item-count" >
			{cartItemCount}
			</div> */}
			</Link>
			</div>
			</div>
		</div>
	);
}

export default Navigation;