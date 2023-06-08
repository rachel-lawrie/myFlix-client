import { MovieCard } from "../movie-card/movie-card";

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
    <div>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies selected.</p>
      ) : (
        favoriteMovies.map((movie) => (
          <MovieCard
            key={movie.ID}
            movie={movie}
            username={user.Username}
            token={token}
            favorites={user.Favorites}
            updateFavorites={updateFavorites}
          />
        ))
      )}
    </div>
  );
};
