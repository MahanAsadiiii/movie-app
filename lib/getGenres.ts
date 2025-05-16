import tmdb from "./axios";

export const getGenres = async () => {
  try {
    const response = await tmdb.get(`/genre/movie/list`);
    return response.data.genres;
  } catch (error: any) {
    console.error("Error getting genre list:", error?.message || error);
    throw new Error("Error getting genre list");
  }
};
