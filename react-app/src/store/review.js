const GET_ALL_WATCH_REVIEWS = 'business/reviews'
const GET_CURRENT_USER_REVIEWS = 'businesses/review'
const CREATE_REVIEW = 'businesses/review/create'
const DELETE_REVIEW = 'businesses/review/delete'
const EDIT_REVIEW = 'businessess/review/edit'
const GET_SINGLE_WATCH_REVIEWS = 'business/business_reviwes'


const getWatchReviews = reviews => ({
    type: GET_ALL_WATCH_REVIEWS,
    reviews
})

const getSingleWatchReviews = reviews => ({
    type: GET_SINGLE_WATCH_REVIEWS,
    reviews
})

const getUserReviews = reviews => ({
    type: GET_CURRENT_USER_REVIEWS,
    reviews
})

const createReview = review => ({
    type: CREATE_REVIEW,
    review
})

const deleteReview = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
})

const editReview = review => ({
    type: EDIT_REVIEW,
    review
})

export const allReviewsThunk = () => async dispatch => {
    const response = await fetch(`/api/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getWatchReviews(reviews))
        return reviews
    }
}

export const oneWatchReviewsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/reviews`)
    //console.log('THIS IS RESPONSE FROM THUNK', response)
    if (response.ok) {
        const reviews = await response.json()
        // console.log ("THIS IS REVIEWS PRINTED FROM THUNK",reviews)
        dispatch(getSingleWatchReviews(reviews))
        return reviews
    }
}

export const userReviewsThunk = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getUserReviews(reviews))
        return reviews
    }
}

export const createReviewThunk = (watchId, review) => async (dispatch) => {
    //console.log('THIS IS BIZ ID',businessId)
    // console.log(review)
    try {
        const res = await fetch(`/api/reviews/${watchId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        //console.log('this is res', res)
        if (res.ok) {
            const newReview = await res.json();
            // console.log("Thiis is new review",newReview)
            dispatch(createReview(newReview))
            return newReview
        }
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    // console.log("this is delete thunk res", res)
    if (res.ok) {
        dispatch(deleteReview(reviewId))
    } else {
        const errorData = await res.json()
        return errorData
    }
}

// export const editReviewThunk = (reviewId,editedReview) => async dispatch => {
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(editedReview)
//       })
// console.log("THIS IS EDIT REVIEW RES",response)
//     if(response.ok){
//         const editedReview = await response.json();
//         console.log('Edited Review:', editedReview);
//         dispatch(editReview(editedReview))
//         return editedReview
//     }
// }

export const editReviewThunk = (reviewId, editedReview) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            review_body: editedReview.comment,
            rating: editedReview.stars
        })
    })
    if (res.ok) {
        const editReviewRes = await res.json()
        //console.log("😅 THIS IS EDITED REVIEW FROM THUNK", editReviewRes)
        dispatch(editReview(editReviewRes))
        return editReview
    } else {
        const errorData = await res.json()
        return errorData
    }
}

const initialState = {
    all: null,
    currentUserReviews: null,
    currentWatchReviews: null
    // selectedBusiness: null,
    // search: null
};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_WATCH_REVIEWS:
            newState = { ...state, all: action.reviews }
            return newState
        case GET_SINGLE_WATCH_REVIEWS:
            newState = { ...state, currentWatchReviews: action.reviews }
            return newState
        case GET_CURRENT_USER_REVIEWS:
            newState = { ...state, currentUserReviews: action.reviews }
            return newState
        case CREATE_REVIEW:
            newState = { ...state, review: action.reviews }
            return newState
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.reviewId];
            return newState
        case EDIT_REVIEW:
            newState = { ...state, review: action.review };
            return newState
        default:
            return state
    }
}

export default reviewReducer;