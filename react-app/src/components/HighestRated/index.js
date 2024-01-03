import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as watchActions from '../../store/watch';
import videoSource from "../../videos/videoSource.mp4"
import './HighestedRated.css'
import { Link } from 'react-router-dom';


function TopRatedWatches () {
    const watches = useSelector(state => state.watch.list)
    const history = useHistory();


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(watchActions.getAllWatches());
    }, [dispatch])

    const handleShopAllClick = () => {

      window.scrollTo(0, 0);
      
      history.push('/watch/all');
    };

    let sortedWatches = [];
    if (watches && watches.Watches) {
      
      sortedWatches = watches.Watches.sort((a, b) => b.avg_rating - a.avg_rating);
    }

    const top4Watches = sortedWatches.slice(0, 4)
    


    return (
        <div className='highly-rated-container'>
        <video className='video' autoPlay muted loop >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          <h2 className="watch-list-title">Top 4 Rated Watches</h2>
        <div className="watch-list">
          <ul className="watch-list-items">
            {top4Watches.map(watch => (
              <li key={watch.id} className="watch-item">
                <div className="watch-item-content">
                <Link to={`/watch/${watch.id}`}>
                  <img
                    className="watch-image2"
                    src={watch.image_url}
                    alt={watch.model_name}
                  />
                  </Link>
                  <h3 className="watch-model">{watch.model_name}</h3>
                  {/* <p className="watch-brand">Brand: {watch.brand}</p>
                  <p className="watch-rating">Average Rating: {watch.avg_rating}</p>
                  <p className="watch-description">Description: {watch.description}</p>
                  <p className="watch-price">Price: ${watch.price}</p> */}
                </div>

              </li>
            ))}
          </ul>
        </div>
        {/* <div className='all-watches'> 
      <NavLink to="/watch/all">
        <button>Shop all Watches </button>
      </NavLink>
    </div> */}
          <div className="all-watches">
        <button onClick={handleShopAllClick}>Shop all Watches</button>
      </div>
      <footer className='footer'>
        <p> Developed by <a href="https://github.com/ejorgji1">Enea Jorgji</a> - React - Python - Flask - SQLAlchemy - PostgreSQL - Redux</p>
      </footer>
        </div>
      );
}
    
export default TopRatedWatches;
