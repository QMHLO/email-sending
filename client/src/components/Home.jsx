import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("email", email);
    fd.append("message", message);
    fd.append("myfile", file);

    try {
      const res = await fetch("https://email-backend-z1wz.onrender.com/register", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 401 || !data) {
        console.log("error");
      } else {
        setShow(true);
        setEmail("");
        setMessage("");
        setFile(null); // Reset file state to null
        console.log("Email sent");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      {show && (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          Your Email Successfully Sent
        </Alert>
      )}
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <h2>Send Email With React & NodeJs</h2>
          <img src="/gmail.png" alt="gmail img" className="mx-3" style={{ width: "50px" }} />
        </div>
        <div className="d-flex justify-content-center">
          <Form className="mt-2 col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Your Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Enter Your Message</Form.Label>
              {/* <Form.Control type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" /> */}
              <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload PDF File</Form.Label>
              {/* <Form.Control type="file" onChange={handleFileChange} /> */}
              <input type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={sendEmail}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
