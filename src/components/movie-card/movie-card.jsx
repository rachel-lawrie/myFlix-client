import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
