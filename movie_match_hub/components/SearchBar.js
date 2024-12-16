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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Search
            </button>

            {/* API Sonuçlarını Görüntüleme */}
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {results.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => onMovieSelect(movie.title)}
                        style={{
                            margin: "10px",
                            padding: "10px",
                            width: "200px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            borderRadius: "5px",
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/200x300?text=No+Image"
                            }
                            alt={movie.title}
                            style={{ width: "100%", height: "300px", borderRadius: "5px" }}
                        />
                        <h3 style={{ margin: "10px 0", fontSize: "16px" }}>{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
