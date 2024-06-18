import React, { useEffect } from 'react';
import Navigationbar from './Navigationbar';
import JobDetailForm from './JobDetailForm';
import '../App.css'; // Import the CSS file
import JobJunctionImage from './JobJunction.jpeg';
import Top7JobCard from './Top7JobCard';
import GoToTopButton from '../GoToTopButton';
import Footer from './Footer';

export default function Home({ isAuth, setIsAuth }) {
  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth, setIsAuth]);

  return (
    <>
      <Navigationbar isAuth={isAuth} setIsAuth={setIsAuth} />
    <div className="home-container">  
      {isAuth === false ? (
        /* Design home page with image and information */
        <>
         <div className="home-info">
          <img src={JobJunctionImage} alt="Home" className="home-image" />
          <p className='home-p'>
            Welcome to Job Junction, a web application where you can find various job-related information.
            Explore freshers' jobs, internships, hackathons, and more. Stay updated with the latest job opportunities!
          </p>
        </div>
        <div id="Top7JobContainer">
        <Top7JobCard jobType={"FresherJob"}></Top7JobCard>
        <Top7JobCard jobType={"Internship"}></Top7JobCard>
        <Top7JobCard jobType={"HackRank"}></Top7JobCard>
        </div>
        </>
      ) : (
        <div id="home_formContainer">
          <div id="jobDetailContainer">
          <JobDetailForm isAuth={isAuth} setIsAuth={setIsAuth} />
         </div>
        </div>
      )}
    </div>
    <GoToTopButton />
    <Footer></Footer>
    </>
  );
}
