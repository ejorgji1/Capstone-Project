import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import * as watchActions from '../../store/watch';

function YourWatches () {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const watches = useSelector(state => state.watch.list)


    useEffect(() => {
        dispatch(watchActions.getAllWatches());
    }, [dispatch]);

    if (!watches || !watches['Watches']) {
        return <div>Loading...</div>;
      }

    const ownedWatches = watches && watches['Watches'].filter(
        watch => watch.owner_id === currentUser.id
    );



    return (
        <div className='watchMain__grid'>
        {ownedWatches.length > 0 ? (
            ownedWatches.map((watch) => (
            <div key={watch.id} className='watchMain__item'>
                <img src={watch.image_url} alt={`Image of ${watch.model_name}`} className='watchMain__image' />
                <p className="watchMain__name">{watch.model_name}</p>
                <p className="watchMain__brand">Brand: {watch.brand}</p>
                <p className="watchMain__price">Price $: {watch.price}</p>
                <Link to={`/watch/${watch.id}`}>View More</Link>
            </div>
            ))
        ) : (
            <p className="no-watch-messages">Currently you have no watches listed for sale. Will you want to sell one?</p>
        )}
        </div>
    );
}

export default YourWatches