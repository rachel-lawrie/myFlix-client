import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
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
          <div>
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
            <Button variant="primary" onClick={onBackClick}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
