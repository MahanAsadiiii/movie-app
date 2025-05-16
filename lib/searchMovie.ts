import tmdb from "./axios";

export const searchMovie = async (query: string) => {
  try {
    const response = await tmdb.get("/search/movie", {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error: any) {
    console.error("Error getting film:", error?.message || error);
    throw new Error("Error getting film");
  }
};
