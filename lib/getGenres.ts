import tmdb from "./axios";

export const getGenres = async () => {
  const response = await tmdb.get(`/genre/movie/list`);
  console.log(response.data.genres);
  return response.data.genres;
};
