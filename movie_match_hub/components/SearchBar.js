import { useState } from "react";
import { searchMovies } from "../utils/apiHelper";

export default function SearchBar({ onMovieSelect }) {
    const [query, setQuery] = useState(""); // Arama sorgusu
    const [results, setResults] = useState([]); // API sonuçları

    const handleSearch = async () => {
        try {
            const movies = await searchMovies(query);
            setResults(movies);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((movie) => (
                    <li key={movie.id} onClick={() => onMovieSelect(movie.title)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
