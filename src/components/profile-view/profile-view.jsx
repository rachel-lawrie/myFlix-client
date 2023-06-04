// filter /users for user's information
// access APIs through buttons
// allow user to deregister
// bring to mainview, but also possibly navigation view since the click to the page will be from there where the user logic would go

import { React, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { PopupForm } from "../popup-form/popup-form";

export const ProfileView = ({ user, token }) => {
  const [showForm, setShowForm] = useState(false);

  const handleEditProfile = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
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

      <Button variant="primary" onClick={handleEditProfile}>
        Edit Profile
      </Button>
      <PopupForm
        user={user}
        token={token}
        show={showForm}
        handleClose={handleCloseForm}
      />
      <Button variant="primary">Update Password</Button>
    </div>
  );
};
