import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../App.css'; // Import CSS file for styling
// import AdSceneComponent from './AdSceneComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import the spinner icon
import { toast } from 'react-toastify';

export default function JobDetailPage({ isAuth, setIsAuth }) {
  const { JobType, jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDocRef = doc(db, JobType, jobId);
        const jobSnapshot = await getDoc(jobDocRef);
        if (jobSnapshot.exists()) {
          setJobDetails(jobSnapshot.data());
        } else {
          toast.error('No such document!');
        }
      } catch (error) {
        toast.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [JobType, jobId]);

  return (
    <div>
      <Navigationbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <div className="job-detail-container">
        
        {jobDetails ? (
          <>
            <p className="companyTitle">
              {jobDetails.CompanyName} is Hiring For {jobDetails.CompanyJobTitle}
            </p>
            <div className="job-details">
              <img src={jobDetails.CompanyLogoURL} alt="Company Logo" className="company-logo" />
              <p className="job-description">{jobDetails.CompanyDescription}</p>
            </div>
            <div className="Eligibility-card">
              <h3>Eligibility Criteria</h3>
              <h4 className='EligibilityText'>Job Role:- {jobDetails.CompanyJobTitle}</h4>
              <h4 className='EligibilityText'>Qualification:- {jobDetails.Eligibility.join(" , ")}</h4>
              <h4 className='EligibilityText'>Experience:- {jobDetails.JobBatch}</h4>
              <h4 className='EligibilityText'>Job Location:- {jobDetails.JobLocation}</h4>
              <h4 className='EligibilityText'>Package: {jobDetails.CompanyPackageInfo}</h4>
            </div>
            {/* <AdSceneComponent/> */}
            {/* <AdSceneComponent/> */}
          </>
        ) : (
          <FontAwesomeIcon icon={faSpinner} size="2x" spin />
        )}
      </div>
    </div>
  );
}
