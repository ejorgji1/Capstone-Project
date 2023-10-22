import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllWatches from "./components/Watches"
import WatchDetail from "./components/OneWatch"
import AddWatch from "./components/CreateWatchForm"
import EditWatch from "./components/EditWatch";
import YourWatches from "./components/OwnedWatches";
import SearchResults from "./components/SearchResults";
import UserCart from "./components/UserCart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/watch/all" >
            <AllWatches/>
          </Route>
         <Route path="/searchresults/:search_terms">
            <SearchResults />
          </Route>
          <Route path="/watch/:id/edit">
             <EditWatch />
          </Route>
          <Route path="/watch/create-new-watch">
             <AddWatch />
          </Route>
          <Route path="/watch/:id">
            <WatchDetail />
          </Route>
          <Route path="/owned">
            <YourWatches />
          </Route>
          <Route path="/cart">
            <UserCart />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
