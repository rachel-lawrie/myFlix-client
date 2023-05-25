import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from "react-bootstrap/Container";
import { Button, Col, Card, Row } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://lawrie-myflix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data); // log the entire response object
        const moviesFromApi = data.map((movie) => {
          return {
            ID: movie._id,
            Title: movie.Title,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
            Description: movie.Description,
            Image: movie.ImagePath,
          };
        });
        console.log("Movies formatted:", moviesFromApi);
        setMovies(moviesFromApi);
        console.log(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <>
      <Row className="justify-content-md-center align-items-center mt-5">
        {!user ? (
          <>
            <Col md={5}>
              <Card className="me-4 p-3">
                <Card.Body>
                  <Card.Title className="mb-5 text-center">Login</Card.Title>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="p-3">
                <Card.Body>
                  <Card.Title className="mb-5 text-center">Sign Up</Card.Title>
                  <SignupView />
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          movies.map((movie) => (
            <Col className="mb-5" key={movie.ID} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
      {user && selectedMovie === null && (
        <div className="text-center mb-8">
          <Button
            className="mb-5"
            style={{ padding: "5px 10px" }}
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
