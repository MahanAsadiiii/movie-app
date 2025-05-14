import tmdb from "./axios";

export const fetchMoviesDetail = async (id: string) => {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
};
