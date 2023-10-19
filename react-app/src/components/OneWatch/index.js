import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneWatch } from "../../store/watch";
import { useParams, useHistory } from "react-router-dom";
import "./OneWatch.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteWatchModal"
import { allReviewsThunk, oneWatchReviewsThunk } from "../../store/review";
import PostReviewModal from "../PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewModal from "../EditReviewModal";

function WatchDetail() {

const history = useHistory();
const dispatch = useDispatch();
const { id } = useParams();
const watch = useSelector((state) => state.watch.selectedWatch);
const currentUser = useSelector((state) => state.session.user);
const user = useSelector((state) => state.session.user);
const reviews = useSelector((state) => state.reviews.currentWatchReviews);
console.log('🥰' ,reviews)

  useEffect(() => {
    console.log("Fetching watch with id:", id);
    dispatch(fetchOneWatch(id));
    dispatch(oneWatchReviewsThunk(id))
  }, [dispatch, id]);

if (!watch) return <div>Loading...</div>;

if (!reviews) {
  return <div>Loading Reviews...</div>;
}

console.log("Watch details:", watch);


const handleEdit = () => {
    history.push(`/watch/${watch.id}/edit`);
};

const changeDate = (date) => {
  let newDate = new Date(date)
  let options = { day: 'numeric', month: 'long', year: 'numeric' };
  let changedDate = newDate.toLocaleString('en-US', options);
  return changedDate
}


return (
  <div>
    <div className="watch-detail">
      <h2>{watch.model_name}</h2>
      <img
        src={watch.image_url}
        alt={`Image of ${watch.model_name}`}
        className="watch-image" 
      />
      <p className="watch-paragraph">Brand: {watch.brand}</p>
      <p className="watch-paragraph">Price: ${watch.price}</p>
      <p className="watch-paragraph">About: {watch.about}</p>
      <p className="watch-paragraph">Description: {watch.description}</p>
      <p className="watch-paragraph">Rating: {watch.avg_rating}</p>
      {currentUser && currentUser.id === watch.owner_id && (
           <div className="business-buttons-conditional">
            <button
                className="edit-business-button"
                onClick={() => handleEdit(watch.id)}
             >
                Edit
             </button>
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteModal watch_data={watch} />}
            id={"delete-business-button"}
          />
        </div>
      )}
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
   </div>
  );
}


export default WatchDetail;






