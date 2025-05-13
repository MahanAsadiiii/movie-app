import tmdb from "./axios";

export const fetchMoviesList = async (page: number) => {
  const response = await tmdb.get("/discover/movie", {
    params: {
      page: page,
    },
  });
  return response.data.results;
};
