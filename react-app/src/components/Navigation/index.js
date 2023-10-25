import React, {useEffect} from 'react';
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
	
	useEffect(() => {
		// Always fetch the cart data if the user is logged in
		if (sessionUser) {
		  dispatch(getUserCartThunk());
		}
	  }, [dispatch, sessionUser]);
	
	
	// if (!cart) {
	// 	return "Loading"
	// }

	const cartItemCount = cart?.watches.length || 0;


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
			 {/* )} */}
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
        
        <span class="material-symbols-outlined shopping-cart">
          shopping_cart
        </span>
        <div className="cart-item-count" >
			<Link to='/cart'>{cartItemCount}</Link>
			</div>
		</div>
	);
}

export default Navigation;