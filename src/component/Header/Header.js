import React from "react";
import "./Header.scss";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  let decodedToken = {};

  if (token) {
    decodedToken = jwtDecode(token);
  }

  const btnlogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <section className="fixed-container">
      <div className="site-header">
        <div>
          <h1>Personal Note Hub</h1>
        </div>

        <div className="site-header__container">
          <div className="site-header__navv">
            {token ? (
              <>
                <div>
                  <p>{decodedToken.username}</p>
                </div>
                <div>
                  <button className="logout" onClick={btnlogout}>
                    Logout
                  </button>
                </div>
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
