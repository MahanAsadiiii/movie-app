export const revalidate = 300;

import { fetchMoviesList } from '@/lib/moviesList';
import { MovieCard } from '@/components';
import { MovieInterface } from '@/types/movie';
import { searchMovie } from '@/lib/searchMovie';
import Link from 'next/link';

type PageProps = {
  searchParams: Promise<{ page?: string, query?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const query = resolvedSearchParams.query;
  let movies = [];

  //depeneds on situation, showing movie list 
  if (query) {
    movies = await searchMovie(query);
  } else {
    movies = await fetchMoviesList(page);
  }

  return (
    <section className="flex flex-col my-5 px-4 md:px-2 gap-3">
      <div className="flex justify-between items-start gap-5">
        <Link href={'/'} className='cursor-pointer w-1/2'>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 capitalize ">movie website</h1>
        </Link>
        <form method="GET" className="flex gap-1">
          <input
            type="text"
            name="query"
            placeholder="Search...."
            defaultValue={query || ""}
            className=" md:text-lg border border-neutral-600 rounded-md px-1"
          />
          <button
            type="submit"
            className="bg-amber-600 text-white px-2 py-1 rounded-md hover:bg-amber-700 transition"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex gap-4 justify-between">
        <a href={`/?page=${page - 1}`} className='bg-neutral-600/50 md:text-lg font-bold capitalize px-4 py-2 rounded-md cursor-pointer'>previous page</a>
        <a href={`/?page=${page + 1}`} className='bg-neutral-600/50 md:text-lg font-bold capitalize px-4 py-2 rounded-md cursor-pointer'>next page</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-col-5 gap-y-8 md:gap-x-4 mt-5 md:min-w-5xl ">
        {movies.map((movie: MovieInterface) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}
