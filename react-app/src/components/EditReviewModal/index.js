import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./EditReviewModal.css";
import StarsRating from "./StarsRating";
import { editReviewThunk } from "../../store/review";
import { fetchOneWatch } from "../../store/watch";
import { oneWatchReviewsThunk } from "../../store/review";

function EditReviewModal({ watch_id, review }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const watch = useSelector((state) => state.watch.selectedWatch);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.reviews);
  //  console.log('THIS IS THE REVIEW FROM EDIT REVIEW MODAL', reviews)
  const [errors, setErrors] = useState({});
  const [stars, setStars] = useState(review.rating);
  const [comment, setComment] = useState(review.review_body);
  const [formDisabled, setFormDisabled] = useState(true);
  const { closeModal } = useModal();

  //   useEffect(() => {
  //     //dispatch(fetchOneBusiness(id));
  //     dispatch(oneBussinessReviewsThunk(business_id));
  //   }, [dispatch, review_id]);

  useEffect(() => {
    const errors = {};
    if (stars && stars < 1) {
      errors.stars = "Please input a star rating";
    }
    if (comment && comment.length < 10) {
      errors.comment = "Comment needs a minimum of 10 characters";
    }
    setErrors(errors);
  }, [stars, comment]);

  useEffect(() => {
    if (!stars || !comment || stars < 1 || comment.length < 10) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, [dispatch, stars, comment]);

  const onChange = (stars) => {
    setStars(stars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const userId = user ? user.id : null;
    //const reviewId = review ? review.id : null; 
    const editedReview = { comment, stars };
    // console.log("THIS IS EDITED REVIEW",editedReview)

    dispatch(editReviewThunk(review.id, editedReview))
      .then(() => {
        dispatch(fetchOneWatch(watch_id));
        dispatch(oneWatchReviewsThunk(watch_id));
        closeModal();
      })
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });
  };

  if (!watch) return <div>Loading...</div>;
  return (
    <div id="editReviewContainer">
      <div className="editReviewHeading">Edit Your Review</div>
      <label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment-input"
          placeholder="Edit your review here..."
        />
      </label>
      {errors.comment && <p>{errors.comment}</p>}
      <div className="rating-input">
        <StarsRating disabled={false} stars={stars} onChange={onChange} />
        <div>Stars</div>
        {errors.rating && <p>{errors.rating}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className={formDisabled ? "submit-button-inactive" : "submit-button"}
        type="submit"
        disabled={formDisabled}
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditReviewModal;