import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneWatch } from "../../store/watch";
import { useParams, useHistory } from "react-router-dom";
import "./OneWatch.css";
import OpenModalButton from "../OpenModalButton";
import OpenDeleteModalButton from "../OpenDeleteWatchModalButton";
import DeleteModal from "../DeleteWatchModal"
import { allReviewsThunk, oneWatchReviewsThunk } from "../../store/review";
import PostReviewModal from "../PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewModal from "../EditReviewModal";
import { addToCartThunk, getUserCartThunk } from "../../store/cart";

function WatchDetail() {

const history = useHistory();
const dispatch = useDispatch();
const { id } = useParams();
const [addedToCart, setAddedToCart] = useState(false)
const watch = useSelector((state) => state.watch.selectedWatch);
const currentUser = useSelector((state) => state.session.user);
const user = useSelector((state) => state.session.user);
const reviews = useSelector((state) => state.reviews.currentWatchReviews);
const userCart = useSelector((state) => state.cart.cart)


  useEffect(() => {
    console.log("Fetching watch with id:", id);
    dispatch(fetchOneWatch(id));
    dispatch(oneWatchReviewsThunk(id))
    dispatch(getUserCartThunk())
  }, [dispatch, id]);

if (!watch) return <div>Loading...</div>;

if (!reviews) {
  return <div>Loading Reviews...</div>;
}




const isWatchInCart = userCart ? userCart.watches.some((cartWatch) => cartWatch.id === watch.id) : false;


const handleEdit = () => {
    history.push(`/watch/${watch.id}/edit`);
};

const handleAddToCart = () => {
  if (currentUser) {
    dispatch(addToCartThunk(watch.id))
    setAddedToCart(true)
  }else {
    return (
      <h1>
        Please log in to add a watch to your cart!!
      </h1>
    )
  }

}

const changeDate = (date) => {
  let newDate = new Date(date)
  let options = { day: 'numeric', month: 'long', year: 'numeric' };
  let changedDate = newDate.toLocaleString('en-US', options);
  return changedDate
}


return (
  <div>
    <div className="watch-detail-container">
    <div className="watch-detail">
      <img
        src={watch.image_url}
        alt={`Image of ${watch.model_name}`}
        className="watch-image" 
      />
      <div className="watch-detail-info">
      <div className="watch-title">
      <h2>{watch.model_name}</h2>
      </div>
      {currentUser && currentUser.id === watch.owner_id && (
           <div className="business-buttons-conditional">
            <button
                className="edit-business-button"
                onClick={() => handleEdit(watch.id)}
             >
                Edit
             </button>
          <OpenDeleteModalButton
            buttonText="Delete"
            modalComponent={<DeleteModal watch_data={watch} />}
            id={"delete-business-button"}
            className="edit-business-button"
          />
        </div>
      )}
        {(currentUser &&  currentUser.id !== watch.owner_id) && !isWatchInCart  && !addedToCart ? (
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : null}
      <p className="brandName">Brand: {watch.brand}</p>
      <p className="watch-paragraph">Price: $ {Number(watch.price).toLocaleString()}</p>
      <p className="watch-paragraph">About: {watch.about}</p>
      <p className="watch-paragraph">Description: {watch.description}</p>
      <p className="watch-paragraph">Rating: {watch.avg_rating}</p>
      </div>
</div>
</div>
<div className="postYourReview">
  {user &&
    user.id !== watch.owner_id &&
    !reviews.watch_reviews.some(
      (review) => review.user_id === user.id
    ) && (
      <OpenModalButton
        buttonText="Post Your Review"
        modalComponent={<PostReviewModal id={id} user={user} />}
        id={"post-review-button"}
        className="beep"
      />
    )}
</div>
{reviews &&
        reviews.watch_reviews.map((review) => (
            <div key={review.id} className="individualReview">
              <p className="user-individual-review">

                {review.user_first_name} {review.user_last_name} posted on {changeDate(review.created_at)}:
              </p>
              <p>{review.review_body}</p>
              <p>
                {[...Array(review.rating)].map((_, index) => (
                  <i key={index} className="fa-solid fa-star"></i>
                ))}
              </p>
              {user && review.user_id === user.id && (
                <div className="reviewButtons">
                  <OpenModalButton
                    buttonText="Edit"
                    modalComponent={
                      <EditReviewModal watch_id={id} review={review} />
                    }
                    id={"review-edit-button"}
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteReviewModal id={id} review={review.id} />
                    }
                    id={"review-delete-button"}
                  />
                </div>
              )}
            </div>
          ))
          .reverse()}
                <footer className='footer'>
  <p>Developed by 
    <a  target="_blank" rel="noopener noreferrer"> Enea Jorgji</a> - React - Python - Flask - SQLAlchemy - PostgreSQL - Redux
  </p>
  <div class="social-links">
    <a href="https://github.com/ejorgji1" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/enea-jorgji-563b60145/" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-linkedin"></i>
    </a>
  </div>
</footer>
   </div>
  );
}


export default WatchDetail;






