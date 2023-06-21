import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies);
  const { movieId } = useParams();

  const movie = movies.find((m) => m.ID === movieId);

  return (
    <div>
      <style>
        {`
          img {
            width: 100%;
          }
        `}
      </style>

      <Row>
        <Col md={6}>
          <img src={movie.Image} />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div className="movie-view-text">
            <p>
              <strong>Title: </strong>
              {movie.Title}
            </p>
            <p>
              <strong>Description: </strong>
              {movie.Description}
            </p>
            <p>
              <strong>Director: </strong>
              {movie.Director}
            </p>
            <Link to={"/"}>
              <Button variant="primary">Back</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};
