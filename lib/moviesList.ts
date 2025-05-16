import tmdb from "./axios";

export const fetchMoviesList = async (page: number, genre?: string) => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        page: page,
        ...(genre ? { with_genres: genre } : {}),
      },
    });
    return response.data.results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting movie list:", error.message);
    } else {
      console.error("Error getting movie list:", error);
    }
    throw new Error("Error getting movie list");
  }
};
