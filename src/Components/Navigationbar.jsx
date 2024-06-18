import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ModelSignin from './ModelSignin';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navigationbar({ isAuth, setIsAuth }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/");
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth, setIsAuth]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/" id="jobHeading">Job Junction</Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isNavbarOpen ? "true" : "false"}
          >
  <FontAwesomeIcon icon={faBars} style={{color: "white"}} />
            {/* <span className="navbar-toggler-icon"></span> */}
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link links" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link links" to="/FreshersJob">Freshers Job</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link links" to="/Internship">Internships</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link links" to="/HackRank">Hackathons</Link>
              </li>
              {isAuth ? (
                <Button className='btn btn-danger' onClick={handleLogout}>Logout</Button>
              ) : (
                <ModelSignin handleLogin={handleLogin} isAuth={isAuth} setIsAuth={setIsAuth} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
