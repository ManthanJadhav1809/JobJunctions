import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { db } from "../firebase-config";
import { toast } from "react-toastify";

export default function JobDetailForm({ isAuth, setIsAuth }) {
  const [JobsData, setJobsData] = useState({
    CompanyName: "",
    CompanyJobTitle: "",
    CompanyLogoURL: "",
    CompanyDescription: "",
    CompanyPackageInfo: "",
    JobType: "",
    JobURL: "",
    JobLocation: "",
    JobBatch: "",
    CampuseType: "",
    Eligibility: [],
  });
  const [btnDisable, setBtnDisable] = useState(false);
  const postCollectionRef = collection(
    db,
    `${JobsData.JobType === "" ? "JobJunctionData" : JobsData.JobType}`
  );
  
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setJobsData({ ...JobsData, [name]: value });
  };

  const handleDropdownSelect = (eventKey, id) => {
    const keyName = id === "formBasicDropdown" ? "JobType" : "CampuseType";
    setJobsData({ ...JobsData, [keyName]: eventKey });
  };

  const handleCheckboxOnChange = (e) => {
    const { name, checked } = e.target;
    const updatedEligibility = checked
      ? [...JobsData.Eligibility, name]
      : JobsData.Eligibility.filter((option) => option !== name);
    setJobsData({ ...JobsData, Eligibility: updatedEligibility });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setBtnDisable(false);
    try {
      await addDoc(postCollectionRef, {
        CompanyName: JobsData.CompanyName,
        CompanyJobTitle: JobsData.CompanyJobTitle,
        CompanyLogoURL: JobsData.CompanyLogoURL,
        CompanyDescription: JobsData.CompanyDescription,
        CompanyPackageInfo: JobsData.CompanyPackageInfo,
        JobType: JobsData.JobType,
        JobURL: JobsData.JobURL,
        JobLocation: JobsData.JobLocation,
        JobBatch: JobsData.JobBatch,
        CampuseType: JobsData.CampuseType,
        Eligibility: JobsData.Eligibility,
        CreatedAt: serverTimestamp(),
      });
      setBtnDisable(true);
      toast.success("Document successfully added!");
      setJobsData({
        CompanyName: "",
        CompanyJobTitle: "",
        CompanyLogoURL: "",
        CompanyDescription: "",
        CompanyPackageInfo: "",
        JobType: "",
        JobURL: "",
        JobLocation: "",
        JobBatch: "",
        CampuseType: "",
        Eligibility: [],
      });
    } catch (error) {
      setBtnDisable(false);
      toast.error("Error adding document: ", error);
    }
  };

  return (
    <Form onSubmit={handelSubmit}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company Name"
          name="CompanyName"
          value={JobsData.CompanyName}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Job Title"
          name="CompanyJobTitle"
          value={JobsData.CompanyJobTitle}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Job Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Job Location"
          name="JobLocation"
          value={JobsData.JobLocation}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Batch Details</Form.Label>
        <Form.Control
          type="text"
          placeholder="eg. 0-2Year,Any"
          name="JobBatch"
          value={JobsData.JobBatch}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Package</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter package info LPA"
          name="CompanyPackageInfo"
          value={JobsData.CompanyPackageInfo}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicJobType">
        <Form.Label>Select Job Type</Form.Label>
        <Dropdown
          onSelect={(eventKey) => handleDropdownSelect(eventKey, "formBasicDropdown")}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic-jobtype">
            {JobsData.JobType || "Select Option"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="FresherJob">Freshers Job</Dropdown.Item>
            <Dropdown.Item eventKey="HackRank">HackRank</Dropdown.Item>
            <Dropdown.Item eventKey="Internship">Internship</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCampusType">
        <Form.Label>Select Campus Type</Form.Label>
        <Dropdown
          onSelect={(eventKey) => handleDropdownSelect(eventKey, "formBasicCampusType")}
        >
          <Dropdown.Toggle variant="primary" id="dropdown-basic-campustype">
            {JobsData.CampuseType || "Select Option"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="On">On Campus</Dropdown.Item>
            <Dropdown.Item eventKey="Off">Off Campus</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group>
        <Form.Label>Select Eligibility Type</Form.Label>
        <div>
          <Form.Check
            type="checkbox"
            name="M.Tech"
            label="M.Tech"
            onChange={handleCheckboxOnChange}
          />
          <Form.Check
            type="checkbox"
            name="B.E/B.Tech"
            label="B.E/B.Tech"
            onChange={handleCheckboxOnChange}
          />
          <Form.Check
            type="checkbox"
            name="Diploma"
            label="Diploma"
            onChange={handleCheckboxOnChange}
          />
          <Form.Check
            type="checkbox"
            name="10th"
            label="10th"
            onChange={handleCheckboxOnChange}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company Logo URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="Paste Logo URL"
          name="CompanyLogoURL"
          value={JobsData.CompanyLogoURL}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Company Description"
          name="CompanyDescription"
          value={JobsData.CompanyDescription}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company Job URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="Paste Job URL"
          name="JobURL"
          value={JobsData.JobURL}
          onChange={handelOnChange}
          required // Added required attribute
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={btnDisable}>
        Submit
      </Button>
    </Form>
  );
}
