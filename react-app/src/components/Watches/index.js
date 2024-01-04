import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import * as watchActions from '../../store/watch';
import './Watch.css';

function WatchMainPage () {
    const dispatch = useDispatch()
    const watches = useSelector(state => state.watch.list)


    useEffect(() => {
        dispatch(watchActions.getAllWatches());
    }, [dispatch]);


    return (
        <div className='watchMain__grid'>
          {watches && watches["Watches"] ? (
            watches["Watches"].map((watch) => (
              <div key={watch.id} className='watchMain__item'>
                <img src={watch.image_url} alt={`Image of ${watch.model_name}`} className='watchMain__image' />
                <p className="watchMain__name">{watch.model_name}</p>
                <p className="watchMain__brand">Brand: {watch.brand}</p>
                <p className="watchMain__price">Price $: {Number(watch.price).toLocaleString()}</p>
                <Link to={`/watch/${watch.id}`}>View More</Link>
              </div>
            ))
          ) : (
            <p>No watches found.</p>
          )}
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
};

 export default WatchMainPage;

