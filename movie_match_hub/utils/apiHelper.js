export async function searchMovies(query) {
    const apiKey = process.env.TMDB_API_KEY; // Ortam değişkeninden API anahtarını al
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch data from TMDB API");
        }
        const data = await response.json();
        return data.results; // API'den gelen film sonuçlarını döner
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}
