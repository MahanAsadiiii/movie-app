import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error(
    "TMDB API key is missing. Please define NEXT_PUBLIC_TMDB_API_KEY in your .env file"
  );
}

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export default tmdb;
