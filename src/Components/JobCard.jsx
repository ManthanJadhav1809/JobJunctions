import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { db } from "../firebase-config";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSuitcase, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function JobCard({ isAuth, JobType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobPostList, setJobPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, JobType));
        const jobPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobPostList(jobPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [JobType]);

  const handleApply = (jobId, jobType) => {
    navigate(`/JobDetailPage/${jobType}/${jobId}`);
  };

  const handleDelete = async (jobId, jobType) => {
    try {
      const postRef = doc(db, jobType, jobId);
      await deleteDoc(postRef);
      toast.success('Document Deleted Sucessfully');
      // Update jobPostList state after deletion
      setJobPostList(jobPostList.filter((job) => job.id !== jobId));
    } catch (error) {
      toast.error("Error deleting document:", error);
    }
  };

  return (
    <div id="jobCardContainer">
      {isLoading ? (
        <div>
          <Skeleton height={150} count={3} />
        </div>
      ) : (
        jobPostList.map((jobPost) => (
          <div key={jobPost.id} className="jobCard">
            <img src={jobPost.CompanyLogoURL} alt="CompanyLogo" />
            <p className="companyTitle">
              {jobPost.CompanyName} is Hiring For {jobPost.CompanyJobTitle}
            </p>
            <h5><FontAwesomeIcon icon={faLocationDot} /> Location:- {jobPost.JobLocation}</h5>
            <h5><FontAwesomeIcon icon={faSuitcase} /> Batch:- {jobPost.JobBatch}</h5>
            <div>
              <button
                className="jobApplybutton"
                onClick={() => handleApply(jobPost.id, jobPost.JobType)}
              >
                Apply Now
              </button>
              {isAuth && (
                <button
                  className="jobDeletebutton"
                  onClick={() => handleDelete(jobPost.id, jobPost.JobType)}
                >
                  <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
