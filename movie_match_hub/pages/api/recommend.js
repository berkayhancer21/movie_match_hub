export default function handler(req, res) {
  const { selectedMovies } = req.body;

  // Burada TMDB API üzerinden öneri sistemini kurgulayabiliriz
  res.status(200).json({ message: "Recommendations coming soon!" });
}
