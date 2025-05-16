import tmdb from "./axios";

export const fetchMoviesDetail = async (id: string) => {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting movie detail:", error.message);
    } else {
      console.error("Error getting movie detail:", error);
    }
    throw new Error("Error getting movie detail");
  }
};
