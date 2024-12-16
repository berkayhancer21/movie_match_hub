import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [selectedMovie, setSelectedMovie] = useState("");

    const handleMovieSelect = (movieTitle) => {
        setSelectedMovie(movieTitle);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#0070f3" }}>Welcome to MovieMatchHub</h1>
            <p style={{ textAlign: "center" }}>
                Select your favorite movies to get recommendations!
            </p>

            {/* Search Bar Bileşeni */}
            <SearchBar onMovieSelect={handleMovieSelect} />

            {/* Seçilen Filmin Gösterimi */}
            {selectedMovie && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>You selected: {selectedMovie}</h2>
                </div>
            )}
        </div>
    );
}
