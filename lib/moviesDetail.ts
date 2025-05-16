import tmdb from "./axios";

export const fetchMoviesDetail = async (id: string) => {
  try {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error getting movie detail:", error?.message || error);
    throw new Error("Error getting movie detail");
  }
};
