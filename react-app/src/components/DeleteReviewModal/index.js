import './DeleteReview.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/review';
import { fetchOneWatch } from '../../store/watch';
import { oneWatchReviewsThunk } from '../../store/review';


function DeleteReviewModal({ id, review }) {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(deleteReviewThunk(review))
      .then(() => {
        closeModal();
        dispatch(fetchOneWatch(id))
        dispatch(oneWatchReviewsThunk(id));
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
      );
  };

  return (
    <div className="deleteSpotContainer">
      <div className="deleteHeader">Confirm Delete</div>
      <div className="deleteText">Are you sure you want to delete this review?</div>
      <div>
        <button
          onClick={handleSubmit}
          className='confirm-yes'
        >
          Yes (Delete Review)
        </button>
        <button
          onClick={((e) => {
            closeModal();
          })}
          className='cancel'
        >
          No (Keep Review)
        </button>
      </div>
    </div>
  )
}

export default DeleteReviewModal;