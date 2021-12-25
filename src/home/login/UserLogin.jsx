import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../redux/actions/auth.action";

import "./_userLogin.scss";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <h3>youtube clone</h3>
        <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
        <button onClick={handleLogin}>Login With google</button>
        <p>This Project Create Using Youtube api</p>
      </div>
    </div>
  );
};

export default UserLogin;
