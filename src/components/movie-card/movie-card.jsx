import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const MovieCard = ({
  movie,
  username,
  token,
  favorites,
  updateFavorites,
}) => {
  const isFavorite = favorites.includes(movie.ID);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      // Remove movie from favorites
      fetch(
        `https://lawrie-myflix-ed60b02355b8.herokuapp.com/users/${username}/movies/${movie.ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((updatedUser) => {
          updateFavorites(updatedUser.Favorites);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Add movie to favorites
      fetch(
        `https://lawrie-myflix-ed60b02355b8.herokuapp.com/users/${username}/movies/${movie.ID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((updatedUser) => {
          updateFavorites(updatedUser.Favorites);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
        <Card.Img variant="top" src={movie.Image} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <button
          className={`favorite-star ${isFavorite ? "favorite" : ""}`}
          onClick={handleFavoriteClick}
        >
          <i className="fa fa-star"></i>
        </button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
