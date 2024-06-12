import { React, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { PopupForm } from "../popup-form/popup-form";
import { PasswordResetForm } from "../passwordreset-form/passwordreset-form";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const ProfileView = ({ token, setToken }) => {
  const [showForm, setShowForm] = useState(false);
  const [showFormtwo, setShowFormtwo] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleUpdatePassword = () => {
    setShowFormtwo(true);
  };

  const handleCloseFormtwo = () => {
    setShowFormtwo(false);
  };

  const handleDeRegister = () => {
    fetch(
      `https://lawrie-myflix-ed60b02355b8.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

  const handleUpdateProfile = (updatedUser) => {
    // Update the user state with the updated data
    dispatch(setUser(updatedUser));
  };

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
            handleUpdateProfile={handleUpdateProfile}
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
