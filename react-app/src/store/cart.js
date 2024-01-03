const ADD_TO_CART = "cart/ADD_TO_CART"
const GET_USER_CART = "cart/GET_USER_CART"
const REMOVE_WATCH_FROM_CART = "cart/REMOVE_WATCH_FROM_CART"
const DELETE_CART = "cart/DELETE_CART"

export const actionGetUserCart = (userId) => ({
    type: GET_USER_CART,
    userId
})

export const actionAddToCart = (watch) => ({
    type: ADD_TO_CART,
    watch
})

export const removeWatchFromCart = (watchId) => ({
    type: REMOVE_WATCH_FROM_CART,
    watchId,
});

export const deleteCart = () => ({
    type: DELETE_CART,
  });


export const addToCartThunk = (watch_id) => async (dispatch) => {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watch_id }),
    });
 
    if (!response.ok) {
        const errorData = await response.json();
        return dispatch(actionAddToCart({ error: errorData.errors || { message: 'Failed to add to cart' } }));
    }
    
    const data = await response.json();
 
    return dispatch(actionAddToCart(data));
    };


export const getUserCartThunk = () => async (dispatch) => {
    const response = await fetch('/api/cart/get_cart')

    if (response.ok) {
        const data = await response.json();
        const userCart = data.cart; 
        
        dispatch(actionGetUserCart(userCart));
    } else {
        console.error('An error occurred:', response.statusText);
    }
};

 export const removeWatchFromCartThunk = (watchId) => async (dispatch) => {
    const response = await fetch(`/api/cart/remove_watch/${watchId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    if (response.status === 200) {
    dispatch(removeWatchFromCart(watchId));
    } else {
    const errorData = await response.json();
    }
};

export const deleteCartThunk = () => async (dispatch) => {
    const response = await fetch('/api/cart/delete_cart', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    }); 
    if (response.status === 200) {

    dispatch(deleteCart());
    } else {
    const errorData = await response.json();
    }
};

const initialState ={
    cart: null
}



const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          cart: {
            ...state.cart,
            watches: [...(state.cart?.watches || []), action.watch],
          },
        };
  
      case GET_USER_CART:
        return {
          ...state,
          cart: action.userId,
        };
  
      case REMOVE_WATCH_FROM_CART:
        return {
          ...state,
          cart: {
            ...state.cart,
            watches: state.cart.watches.filter((watch) => watch.id !== action.watchId),
          },
        };
  
      case DELETE_CART:
        return {
          ...state,
          cart: null,
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
    
    
    






