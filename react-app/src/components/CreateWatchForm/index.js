import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as watchActions from "../../store/watch";
import "./Watch.css";

function AddWatch() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [brand, setBrand] = useState("");
  const [model_name, setModelName] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDecription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);
  const owner_id = currentUser ? currentUser.id : null;



  const validate = () => {
    const errors = [];

    if (!brand || brand.length < 5 || brand.length > 40) {
      errors.push("Brand name must be between 5 and 50 characters.");
    }

    if (!model_name || model_name.length < 5 || model_name.length > 50) {
      errors.push("Watch model name must be between 5 and 50 characters.");
    }



  if (!price) {
    errors.push("Price is required");
  } else if (isNaN(price)) {
    errors.push("Price must be a number");
  } else if (parseFloat(price) <= 0) {
    errors.push("Price cannot be 0 or a negative number");
  }

    if (!about || about.length > 500) {
      errors.push("Invalid about text.");
    }

    if (!description || description.length > 500) {
      errors.push("Invalid description text.");
    }

    if (!image_url) {
      errors.push = "Preview image is required.";
    }
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

  if (errors.length > 0) return setValidationErrors(errors);
    const formData = new FormData();
    formData.append('brand', brand)
    formData.append("model_name", model_name);
    formData.append("price", price);
    formData.append("about", about);
    formData.append("description", description);
    formData.append("image_url", image_url);
    setImageLoading(true);
    await dispatch(watchActions.createNewWatch(formData));
    history.push("/owned");
  }


  useEffect(() => {
    async function fetchData() {
      await dispatch(watchActions.getAllWatches());
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="form__container watch__form">
      <div className="watch-error__container">
        {validationErrors.map((error, index) => (
          <div className="error" key={index}>
            {error}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}
      encType="multipart/form-data">
        <div className="input__container">
          <h2>New Watch</h2>
          <div className="form__input">
            <label>Brand</label>
            <p>
              This is the brand name of your watch.
            </p>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              placeholder="Enter the watch brand"
            />
          </div>
          <div className="form__input">
            <label>Model Name</label>
            <p>This is your watch model name.</p>
            <input
              type="text"
              value={model_name}
              onChange={(e) => setModelName(e.target.value)}
              required
              placeholder="Enter the model name of your watch"
            />
          </div>
          <div className="form__input">
            <label>Price</label>
            <p>Price you want to sell your watch. </p>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
            />
          </div>
          <div className="form__input">
            <label>About</label>
            <p>Provide some information about the watch you are selling.</p>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              placeholder="Enter the information relevant to your watch"
            />
          </div>
          <div className="form__input">
            <label>Description</label>
            <p>Provide a brief description of your watch.</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDecription(e.target.value)}
              required
              placeholder="Please describe your watch."
            />
          </div>
          <div className="form__input">
            <label>Image URL</label>
            <p>
            Liven up your watch with photo
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              required
              placeholder="Submit a link to at least one photo to publish your spot."
            />
          </div>
        </div>
        <div className="form__input button__container">
          <button className="form__button" type="submit">
            Add Watch
          </button>
        </div>
      </form>
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


export default AddWatch;
