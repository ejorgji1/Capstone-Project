import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { searchWatchByBrand } from "../../store/watch";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import './SearchResults.css'


const SearchResults = () => {

    const {search_terms}  = useParams()

    // console.log("fdfdsfdfasfdf", search_terms);

    const dispatch = useDispatch()

    const searchResultProducts = (useSelector(state => state.watch.search))
    useEffect(async () => {
      await dispatch(searchWatchByBrand(search_terms))
    }, [dispatch, search_terms])
    
    console.log("THIS IS SEARCH RESULT ?????", searchResultProducts)
 

    return (
        <>
        <h1 className="search-results-header">Search Results for "{`${search_terms}`}"</h1>
       
        <div className='watchMain__grid'>
          {searchResultProducts && searchResultProducts["queried watches"] ? (
            searchResultProducts["queried watches"].map((watch) => (
              <div key={watch.id} className='watchMain__item'>
                <img src={watch.image_url} alt={`Image of ${watch.model_name}`} className='watchMain__image' />
                <p className="watchMain__name">{watch.model_name}</p>
                <p className="watchMain__brand">Brand: {watch.brand}</p>
                <p className="watchMain__price">Price $: {watch.price}</p>
                <Link to={`/watch/${watch.id}`}>View More</Link>
              </div>
            ))
          ) : (
            <p>No watches found.</p>
          )}
        </div>

        </>
    )
  }
  
  
  export default SearchResults