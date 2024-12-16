export async function searchMovies(query) {
    const apiKey = process.env.TMDB_API_KEY; // API anahtarını .env.local'den alır
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data from TMDB API");
    }

    const data = await response.json();
    return data.results; // Film sonuçlarını döner
}
