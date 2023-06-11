import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import Container from "react-bootstrap/Container";
import { Button, Col, Card, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const updateFavorites = (newFavorites) => {
    const updatedUser = { ...user, Favorites: newFavorites };
    setUser(updatedUser);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState("");

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

    fetch("https://lawrie-myflix.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data); // log the entire response object
        const usersFromApi = data.map((user) => {
          return {
            ID: user._id,
            Username: user.Username,
            Email: user.Email,
            Birthday: user.Birthday,
            Favorites: user.Favorites,
          };
        });
        console.log("Users formatted:", usersFromApi);
        setUsers(usersFromApi);
        console.log(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="mt-5">
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPath={currentPath}
        />
      </Row>

      <Row className="justify-content-md-center align-items-center mt-5">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <Card className="p-3">
                      <Card.Body>
                        <Card.Title className="mb-5 text-center">
                          Sign Up
                        </Card.Title>
                        <SignupView />
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <Card className="me-4 p-3">
                      <Card.Body>
                        <Card.Title className="mb-5 text-center">
                          Login
                        </Card.Title>
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <>
                      {movies
                        .filter(
                          (movie) =>
                            movie.Title.toLowerCase().includes(
                              searchQuery.toLowerCase()
                            ) ||
                            movie.Genre.toLowerCase().includes(
                              searchQuery.toLowerCase()
                            )
                        )
                        .map((movie) => (
                          <Col className="mb-5" key={movie.ID} md={3}>
                            <MovieCard
                              movie={movie}
                              username={user.Username}
                              token={token}
                              favorites={user.Favorites}
                              updateFavorites={updateFavorites}
                            />
                          </Col>
                        ))}
                    </>
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
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Card className="p-3">
                      <Card.Body>
                        <ProfileView
                          users={users}
                          user={user}
                          token={token}
                          setUser={setUser}
                          setToken={setToken}
                          setCurrentPath={setCurrentPath}
                        />
                      </Card.Body>
                    </Card>
                    <>
                      <FavoritesView
                        user={user}
                        movies={movies}
                        username={user.Username}
                        token={token}
                        favorites={user.Favorites}
                        updateFavorites={updateFavorites}
                      />
                    </>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
