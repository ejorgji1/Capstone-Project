import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as watchActions from '../../store/watch';

function TopRatedWatches () {
    const watches = useSelector(state => state.watch.list)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(watchActions.getAllWatches());
    }, [dispatch])

    let sortedWatches = [];
    if (watches && watches.Watches) {
      // Check if watches and Watches property exist
      sortedWatches = watches.Watches.sort((a, b) => b.avg_rating - a.avg_rating);
    }

    const top4Watches = sortedWatches.slice(0, 4)
    
console.log("THIS IS TOP3 WATCHES",top4Watches)
console.log("THIS IS SORTED WATCHES",sortedWatches)
    return (
        <div>
        <h2>Top 4 Rated Watches</h2>
        <ul>
            {top4Watches.map(watch => (
        <li key={watch.id}>
                <div>
                <img src={watch.image_url} alt={watch.model_name} />
                <h3>{watch.model_name}</h3>
                <p>Brand: {watch.brand}</p>
                <p>Average Rating: {watch.avg_rating}</p>
                <p>Description: {watch.description}</p>
                <p>Price: ${watch.price}</p>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
            }
    
    export default TopRatedWatches;
