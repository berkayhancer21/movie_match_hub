import { useState } from "react";
import { searchMovies } from "../utils/apiHelper";

export default function SearchBar({ onMovieSelect }) {
    const [query, setQuery] = useState(""); // Arama sorgusu
    const [results, setResults] = useState([]); // API sonuçları

    const handleSearch = async () => {
        if (query) {
            const movies = await searchMovies(query);
            setResults(movies);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 w-full">
            {/* DaisyUI Mockup Window */}
            <div className="mockup-window border bg-base-300 w-full lg:w-2/3 xl:w-1/2">
                <div className="flex flex-col items-center justify-center p-8 bg-base-200">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="input input-bordered input-primary w-full max-w-md mb-6 text-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="btn btn-primary w-48 text-lg"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* API Sonuçları */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
                {results.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => onMovieSelect(movie.title)}
                        className="card w-64 bg-base-100 shadow-xl cursor-pointer"
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
                            <h2 className="card-title">{movie.title}</h2>
                            <p>Release: {movie.release_date || "N/A"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
