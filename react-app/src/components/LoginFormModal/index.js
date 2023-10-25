import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/";
import userIcon from "../../images/user-icon.png"

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    let email = "demo@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/watch/all")
      closeModal()
    }
  }

  return (
    <>
      <div className="icon-container">
        <img src={userIcon}
          className="icon"
          alt=""
        />
      </div>
      <div className="login-form-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul style={{ color: 'red' }}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="form-group">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
        <p className="or">or</p>
        <button onClick={demoUser} className="btn-demo">
          Log In as Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
