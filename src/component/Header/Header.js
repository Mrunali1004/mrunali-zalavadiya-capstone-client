import React from "react";
import "./Header.scss";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";

const Header = () => {
  const token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  let decodedToken = {};

  if (token) {
    decodedToken = jwtDecode(token);
  }

  const btnlogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <section>
      <div className="site-header">
        <div className="site-header__wrapper">
          {/* <img src={logo} alt="site-logo" className="site-header__logo" /> */}
          <h1 className="site-header__title">Personal Note Hub</h1>
        </div>

        <div className="site-header__user-section">
          <div className="site-header__user-info">
            {token ? (
              <>
                <div className="site-header__userwrapper">
                  <p className="site-header__username">
                    {decodedToken.username}
                  </p>
                </div>
                <button className="logout" onClick={btnlogout}>
                  <i className="sign out alternate icon" />
                  Logout
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
