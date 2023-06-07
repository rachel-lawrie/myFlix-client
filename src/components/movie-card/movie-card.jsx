import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const MovieCard = ({ movie, username, token, favorites }) => {
  console.log(favorites);

  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
        <Card.Img variant="top" src={movie.Image} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <button
          className={`favorite-star ${
            favorites.includes(movie.ID) ? "favorite" : ""
          }`}
          // onClick={handleFavoriteClick}
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
