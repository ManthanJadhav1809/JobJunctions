import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore'; // Assuming you are using Firebase Firestore
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';

export default function Top7JobCard({ jobType }) {
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, jobType));
        const jobPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobDetails(jobPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, [jobType]); // Include jobType in the dependency array

  return (
    <div>
        
      <h3>{jobType}</h3>
      <ul id='Top7JobCard'>
        {jobDetails.length > 0 ? (
          jobDetails.slice(0, 7).map((jobData) => (
           <li className='Top7Job' key={jobData.id}>
              <Link to={`/JobDetailPage/${jobData.JobType}/${jobData.id}`} >{jobData.CompanyName} is Hiring For {jobData.CompanyJobTitle}</Link>  
            </li>
          ))
        ) : (
          <h4>No data</h4>
        )}
      </ul>
    </div>
  );
}
