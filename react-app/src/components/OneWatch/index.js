import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneWatch } from "../../store/watch";
import { useParams, useHistory } from "react-router-dom";
import "./OneWatch.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteWatchModal"

function WatchDetail() {

const history = useHistory();
const dispatch = useDispatch();
const { id } = useParams();
const watch = useSelector((state) => state.watch.selectedWatch);
const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    console.log("Fetching watch with id:", id);
    dispatch(fetchOneWatch(id));
  }, [dispatch, id]);

if (!watch) return <div>Loading...</div>;

console.log("Watch details:", watch);


const handleEdit = () => {
    history.push(`/watch/${watch.id}/edit`);
};

return (
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
  );
}

export default WatchDetail;






