import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteWatch } from "../../store/watch";
import { useModal } from "../../context/Modal";
import './DeleteWatchModal.css'

export default function DeleteModal({ watch_data }) {
  console.log("DeleteModal is rendered", watch_data.id);
  const id = watch_data.id
  console.log("WATCH DATA ID FOR DELETE", id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    return dispatch(deleteWatch(id)).then(() => {
      closeModal();
      history.push('/owned')
    });
    // dispatch()
    // alert("Delete button clicked");
    // console.log('handleDelete is called');
    // history.push('/business/all');
  };

  return (
    <div className="deleteWatchContainer">
      <div className="deleteHeader">Confirm Delete</div>
      <div className="deleteText">Are you sure you want to delete this watch listing?</div>
      <div>
        <button
          class="confirm-yes cursor"
          onClick={handleSubmit}
        >
          Yes (Delete Watch)
        </button>
        <button
          className="cancel"
          onClick={((e) => {
            closeModal();
          })}
        >
          No (Keep Watch)
        </button>
      </div>
    </div>
  )
}
