import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="profile-info">Welcome, {user.username}</li>
            <li className="profile-info">
              {user.first_name} {user.last_name}
            </li>
            <li className="profile-info">{user.email}</li>
            <li className="view-logout-container">
              <NavLink exact to="/owned" className="view-business-button">
                View Watch Listings
              </NavLink>
              <NavLink
                exact
                to="/watch/create-new-watch"
                className="create-business-button"
              >
                Create a watch listing
              </NavLink>
              <button onClick={handleLogout} id="logout-button">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <div className="view-logout-container">
              <OpenModalButton
                className="login-button-specific"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                id={"log-in-button"}
              />

              <OpenModalButton
                className="signup-button--specific"
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                id={"sign-up-button"}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
