import tmdb from "./axios";

export const getGenres = async () => {
  try {
    const response = await tmdb.get(`/genre/movie/list`);
    return response.data.genres;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting genre list:", error.message);
    } else {
      console.error("Error getting genre list:", error);
    }
    throw new Error("Error getting genre list");
  }
};
