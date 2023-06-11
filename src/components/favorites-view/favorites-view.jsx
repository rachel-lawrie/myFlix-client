import { MovieCard } from "../movie-card/movie-card";
import { Button, Col, Card, Row } from "react-bootstrap";

export const FavoritesView = ({
  movies,
  user,
  username,
  token,
  updateFavorites,
}) => {
  console.log("User Favorites:", user.Favorites);
  // Filter movies based on IDs present in user.Favorites
  const favoriteMovies = movies.filter((movie) =>
    user.Favorites.includes(movie.ID)
  );

  return (
    <Row className="justify-content-center mt-5">
      <h1 className="favorites-heading text-center mb-4">Favorites</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies selected.</p>
      ) : (
        favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie.ID} md={3}>
            <MovieCard
              key={movie.ID}
              movie={movie}
              username={user.Username}
              token={token}
              favorites={user.Favorites}
              updateFavorites={updateFavorites}
            />
          </Col>
        ))
      )}
    </Row>
  );
};
