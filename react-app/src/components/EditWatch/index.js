import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as watchActions from "../../store/watch";
import "./EditWatch.css";

function EditWatch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const watches = useSelector((state) => state.watch.list);
    //console.log("😇", watches)
  const watch = useSelector((state) =>
    state.watch.list.Watches
      ? state.watch.list.Watches.find((b) => b.id === parseInt(id))
      : null
  );
  // console.log ('ID OF WATCH TO BE EDITED',id)
  // console.log( "WATCH TO BE EDITED", watch)

  useEffect(() => {
    dispatch(watchActions.getAllWatches());
  }, [dispatch]);

  const [brand, setBrand] = useState(watch ? watch.brand : "");
  const [model_name, setModelName] = useState(watch ? watch.model_name : "");
  const [price, setPrice] = useState(watch ? watch.price : "");
  const [about, setAbout] = useState(watch ? watch.about : "");
  const [description, setDecription] = useState(watch ? watch.description : "");
  const [image_url, setImageUrl] = useState(watch ? watch.image_url : "");
  const [imageLoading, setImageLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);
  const owner_id = currentUser ? currentUser.id : null;

  // const urlValidation = (str) => {
  //   return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  // };

  const validate = (values) => {
    const errors = [];

    if (!values.brand || values.brand.length < 5 || values.brand.length > 40) {
      errors.push("Brand name must be between 5 and 50 characters.");
    }

    if (
      !values.model_name ||
      values.model_name.length < 5 ||
      values.model_name.length > 50
    ) {
      errors.push("Watch model name must be between 5 and 50 characters.");
    }

    if (!values.price) {
      errors.push("Watch price is required.");
    }

    if (!values.about || values.about.length > 500) {
      errors.push("Invalid about text.");
    }

    if (!values.description || values.description.length > 500) {
      errors.push("Invalid description text.");
    }

    // if (!values.image_url) {
    //   errors.push = "Preview image is required.";
    // }

    // if (
    //   values.image_url &&
    //   !values.image_url.match(/(\.png|\.jpg|\.jpeg)\s*$/)
    // ) {
    //   errors.push = "iImage URL must end in .png, .jpg, or .jpeg.";
    // }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit triggered');
    const errors = validate({
      brand,
      model_name,
      price,
      about,
      description,
      // image_url,
      // owner_id,
    });

    if (errors.length > 0) return setValidationErrors(errors);

    // const watchData = {
    //   id,
    //   brand,
    //   model_name,
    //   price,
    //   about,
    //   description,
    //   // image_url,
    //   // owner_id,
    // };
    const priceAsFloat = parseFloat(price);

    const formData = new FormData();
    formData.append('brand', brand)
    formData.append("model_name", model_name);
    formData.append("price", priceAsFloat);
    formData.append("about", about);
    formData.append("description", description);
    formData.append("image_url", image_url);
    setImageLoading(true);

     console.log("WATCH UPDATE", formData)
    await dispatch(watchActions.editWatch(id, formData));
    await dispatch(watchActions.fetchOneWatch(id));
    await dispatch(watchActions.getAllWatches());
    await history.push(`/watch/${id}`);
  };

  //console.log('Rendering EditWatch component');

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
          <h2>Update Watch</h2>
          <div className="form__input">
            <label>Brand</label>
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
            <input
              type="text"
              value={description}
              onChange={(e) => setDecription(e.target.value)}
              required
              placeholder="Please describe your watch."
            />
          </div>
          <div className="form__input">
            <label>Submit a new image if you wish, otherwise, the image won't be updated</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              // required
              placeholder="Submit a link to at least one photo to publish your spot."
            />
          </div>
        </div>
        <div className="form__input button__container">
          <button className="form__button" type="submit">
            Update Watch
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWatch;