// filter /users for user's information
// access APIs through buttons
// allow user to deregister
// bring to mainview, but also possibly navigation view since the click to the page will be from there where the user logic would go

import { React, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { PopupForm } from "../popup-form/popup-form";
import { PasswordResetForm } from "../passwordreset-form/passwordreset-form";
import { Col } from "react-bootstrap";

export const ProfileView = ({
  user,
  token,
  setUser,
  setToken,
  setCurrentPath,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleEditProfile = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const [showFormtwo, setShowFormtwo] = useState(false);

  const handleUpdatePassword = () => {
    setShowFormtwo(true);
  };

  const handleCloseFormtwo = () => {
    setShowFormtwo(false);
  };

  const handleDeRegister = () => {
    console.log(token);
    fetch(`https://lawrie-myflix.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          setToken(null);
          localStorage.clear();
          alert("Account succesfully deleted");
          window.location.reload();
        } else {
          console.error("Failed to deregister");
        }
      })
      .catch((error) => {
        console.error("Error deregistering account:", error);
      });
  };

  useEffect(() => {
    setCurrentPath("/profile");
    return () => {
      setCurrentPath(null);
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Col>
      <div>
        <h1 style={{ textAlign: "center", margin: "0 auto" }}>Profile</h1>
        <p>
          <strong>Username: </strong>
          {user.Username}
        </p>
        <p>
          <strong>Email: </strong>
          {user.Email}
        </p>
        <p>
          <strong>Birthday: </strong>
          {new Date(user.Birthday).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
        <div className="mb-3" style={{ display: "flex" }}>
          <Button
            className="mx-2"
            variant="primary"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
          <PopupForm
            user={user}
            token={token}
            show={showForm}
            handleClose={handleCloseForm}
          />
          <PasswordResetForm
            username={user.Username}
            token={token}
            showtwo={showFormtwo}
            handleClosetwo={handleCloseFormtwo}
          />
          <Button
            className="mx-2"
            variant="primary"
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
          <Button
            className="mx-2"
            username={user.Username}
            variant="primary"
            onClick={handleDeRegister}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </Col>
  );
};
