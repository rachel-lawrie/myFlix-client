import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const PopupForm = ({
  token,
  show,
  handleClose,
  handleUpdateProfile,
}) => {
  const user = useSelector((state) => state.user);
  const originalUsername = user.Username;
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedBirthday = new Date(birthday).toISOString().slice(0, 10);

    const data = {
      Username: username,
      Email: email,
      Birthday: formattedBirthday,
    };

    console.log("Data:", data);

    fetch(
      `https://rl-myflix-422ec97b1c46.herokuapp.com/users/${originalUsername}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        // callback function to update the profile in ProfileView
        handleUpdateProfile(updatedUser);
        alert("Information update successful");
        handleClose();
      })
      .catch((error) => {
        alert("Information update failed");
        console.error("Error updating profile:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              placeholder={user.Username}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={user.Email}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder={user.Birthday}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
