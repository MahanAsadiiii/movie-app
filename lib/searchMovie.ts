import tmdb from "./axios";

export const searchMovie = async (query: string) => {
  const response = await tmdb.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
};
