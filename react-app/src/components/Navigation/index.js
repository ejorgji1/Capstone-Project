import React, {useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { getUserCartThunk } from '../../store/cart';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


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
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{location.pathname === '/' && (
        <div className='searchbar'>
          <SearchBar />
        </div>
			)}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
        
        <span class="material-symbols-outlined shopping-cart">
          shopping_cart
        </span>
        <span className="cart-item-count" >
			<Link to='/cart'>{cartItemCount}</Link>
			</span>
		</ul>
	);
}

export default Navigation;