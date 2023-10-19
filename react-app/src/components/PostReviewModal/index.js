import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./PostReviewModal.css";
import { createReviewThunk } from "../../store/review";
import StarsRating from "./StarsRating";
import { fetchOneWatch } from '../../store/watch';
import { oneWatchReviewsThunk } from "../../store/review";

function PostReviewModal({ id, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const watch = useSelector(state => state.watch.selectedWatch);


  //const user = useSelector(state => state.session.user)
  //console.log(user)

  const [errors, setErrors] = useState({});
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [formDisabled, setFormDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchOneWatch(id));
  }, [dispatch]);

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

    // Check if the user has already posted a review
    //   const hasUserPostedReview =
    //   business.reviews.some((review) => review.user_id === (user ? user.id : null));

    // if (hasUserPostedReview) {
    //   // User has already posted a review, handle accordingly (e.g., display an error message)
    //   setErrors({ review: "You have already posted a review for this business." });
    //   return;
    // }
    const userId = user ? user.id : null;
    const watchId = watch && watch.id ? watch.id : null;
    const submittedReview = { userId, review_body: comment, rating: stars };

    dispatch(createReviewThunk(watch.id, submittedReview))
      .then(() => {
        dispatch(fetchOneWatch(id));
        dispatch(oneWatchReviewsThunk(id));
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (!watch) return <div>Loading...</div>;
  return (
    <div id="postReviewContainer">
      <div className="postReviewHeading">How was your stay?</div>
      <div className="post-review-errors">
        {errors.comment && errors.comment ? <>{errors.comment}</> : <div className="empty-space"> </div>}
      </div>
      <label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="comment-input"
          placeholder="Leave your review here..."
        />
      </label>
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
        Submit Your Review
      </button>
    </div>
  );
}

export default PostReviewModal;