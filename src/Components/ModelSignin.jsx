import React from 'react';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { toast } from 'react-toastify';

export default function ModelSignin({isAuth,setIsAuth}) {
  const [show, setShow] = useState(false);
  const [adminData, setAdminData] = useState({
    Email: "",
    Password: "",
  });
  
  const navigate=useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [btnDisable,setBtnDisable]=useState(false);
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Check if email and password match the admin credentials
    setBtnDisable(true);
    signInWithEmailAndPassword(auth,adminData.Email,adminData.Password)
    .then(
      async(res)=>{
        setBtnDisable(false);
        setIsAuth(true);
        navigate('/');
        toast.success("Login done")  
      }
    ).catch((e)=>{
      setBtnDisable(false);
      console.log(e.message);
      toast.error("Enter correct Data");
    })
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} disabled={btnDisable}>
        Sign in
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Sign In Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="Email" onChange={handleChange} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="Password" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
