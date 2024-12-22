export default function RecommendedMovies({ movies }) {
    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="card w-64 bg-base-100 shadow-xl"
                >
                    <figure>
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/200x300?text=No+Image"
                            }
                            alt={movie.title}
                            className="h-80 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h4 className="card-title">{movie.title}</h4>
                        <p>Release Date: {movie.release_date || "N/A"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
