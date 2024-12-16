import { useState } from "react";
import { searchMovies } from "../utils/apiHelper";

export default function TestAPI() {
    const [query, setQuery] = useState(""); // Kullanıcıdan alınan sorgu
    const [movies, setMovies] = useState([]); // API'den gelen veriler

    const handleSearch = async () => {
        const results = await searchMovies(query);
        setMovies(results);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>TMDB API Test</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a movie name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
                    Search
                </button>
            </div>

            <h2>Results:</h2>
            <ul>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <li key={movie.id}>
                            {movie.title} ({movie.release_date ? movie.release_date.split("-")[0] : "N/A"})
                        </li>
                    ))
                ) : (
                    <p>No results found. Try searching for something!</p>
                )}
            </ul>
        </div>
    );
}
