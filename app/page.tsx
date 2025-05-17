export const revalidate = 300;

import Link from 'next/link';
import { fetchMoviesList } from '@/lib/moviesList';
import { GenreFilter, MovieCard, Navigator } from '@/components';
import { MovieInterface } from '@/types/movie';
import { searchMovie } from '@/lib/searchMovie';
import { getGenres } from '@/lib/getGenres';

interface PageProps {
  searchParams: Promise<{ page?: string, query?: string, genre?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  // get params from url to pass to fetch functions
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const query = resolvedSearchParams.query;
  const genre = resolvedSearchParams.genre;
  let movies = [];
  const genres = await getGenres()

  //depeneds on situation, showing movie list 
  if (query) {
    movies = await searchMovie(query);
  } else {
    movies = await fetchMoviesList(page, genre);
  }

  return (
    <section className="flex flex-col my-5 px-4 md:px-2 gap-5">

      <div className="flex justify-between flex-wrap items-start ">
        <Link href={'/'} className='cursor-pointer'>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 capitalize ">movie website</h1>
        </Link>
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* by submite this form it shows query in params after that page gets params and pass to function to show movies */}
          <form method="GET" className="flex gap-1">
            <input
              type="text"
              name="query"
              placeholder="Search...."
              defaultValue={query || ""}
              className=" md:text-lg border border-neutral-600 rounded-md p-1"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white rounded-md hover:bg-amber-700 transition text-center text-md font-bold ease-in-out duration-200 capitalize px-4 py-1.5 cursor-pointer "
            >
              Search
            </button>
          </form>
          {/* It shows genres by client side component  */}
          <GenreFilter genres={genres} />
        </div>
      </div>
      {/* showing movies in this section */}
      <section>
        {movies.length ?
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-col-5 gap-y-8 gap-x-4  ">
            {movies.map((movie: MovieInterface) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          :
          <div className="flex justify-center ">
            <h1 className='text-xl md:text-3xl capitalize'>No movie found</h1>
          </div>
        }
      </section>
      {/* If there is more than one page of movies, pagination will appear*/}
      {movies.length >= 20 && <Navigator genre={genre} page={page} query={query} />}
    </section>
  );
}
