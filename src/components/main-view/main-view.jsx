import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.ID}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};
