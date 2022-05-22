const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = {
  baseUrl: "https://api.themoviedb.org/3",
  fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-US&include_video=true`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&include_video=true`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&include_video=true`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&include_video=true`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&include_video=true`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&include_video=true`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&include_video=true`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&include_video=true`,
};
