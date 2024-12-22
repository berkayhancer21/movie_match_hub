import { useAuth } from './_app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchBar from "../components/SearchBar";
import RecommendedMovies from "../components/RecommendedMovies";

export default function Home() {
    const { user } = useAuth(); // Kullanıcı durumu
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu kontrolü
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    // Kullanıcı giriş yapmadıysa yönlendirme
    useEffect(() => {
        if (!user) {
            router.push('/login'); // Giriş sayfasına yönlendirme
        } else {
            setIsLoading(false); // Kullanıcı giriş yapmışsa içeriği göster
        }
    }, [user]);

    // Kullanıcı giriş yapmadıysa yüklenme durumu göster
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Film seçimini eklemek
    const handleMovieSelect = (movieTitle) => {
        if (favoriteMovies.length < 5 && !favoriteMovies.includes(movieTitle)) {
            setFavoriteMovies([...favoriteMovies, movieTitle]);
        }
    };

    // Öneri oluşturma fonksiyonu
    const handleGenerateRecommendations = async () => {
        try {
            const genreCounts = {};
            const apiKey = process.env.TMDB_API_KEY;

            // Kullanıcının favori filmlerini API'den sorgulayıp tür bilgilerini çekiyoruz
            for (const title of favoriteMovies) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`
                );
                const data = await response.json();
                const movie = data.results[0]; // İlk eşleşen filmi al
                if (movie && movie.genre_ids) {
                    movie.genre_ids.forEach((id) => {
                        genreCounts[id] = (genreCounts[id] || 0) + 1;
                    });
                }
            }

            // En popüler 2 türü bulma
            const topGenres = Object.keys(genreCounts)
                .sort((a, b) => genreCounts[b] - genreCounts[a])
                .slice(0, 2);

            // TMDB'den önerilen filmleri çekme
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${topGenres.join(
                    ","
                )}`
            );
            const data = await response.json();
            setRecommendations(data.results.slice(0, 10)); // İlk 10 filmi al

            // Favori filmleri ve giriş bölümünü gizle
            setShowRecommendations(true);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    return (
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Welcome to MovieMatchHub
            </h1>

            {!showRecommendations && (
                <>
                    {/* Search Bar ve Favori Filmler */}
                    <SearchBar onMovieSelect={handleMovieSelect} />

                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold">Your Favorite Movies:</h2>
                        <ul className="list-disc">
                            {favoriteMovies.map((movie, index) => (
                                <li key={index} className="mt-2">
                                    {movie}
                                </li>
                            ))}
                        </ul>

                        {favoriteMovies.length === 5 && (
                            <button
                                onClick={handleGenerateRecommendations}
                                className="btn btn-success mt-4"
                            >
                                Show Recommendations
                            </button>
                        )}
                    </div>
                </>
            )}

            {/* Önerilen Filmler */}
            {showRecommendations && recommendations.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Recommended Movies:
                    </h2>
                    <RecommendedMovies movies={recommendations} />
                </div>
            )}
        </div>
    );
}
