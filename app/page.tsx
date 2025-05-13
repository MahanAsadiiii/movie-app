'use client'
import { useEffect, useState } from 'react';
import { fetchMoviesList } from '@/lib/moviesList';
import { MovieCard, MovieInterface } from '@/components';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMoviesList(page);
      setMovies(data);
    };
    getMovies();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 capitalize ">movie list</h1>
      <div className="flex gap-4 justify-between">
        <button onClick={() => setPage(page - 1)} className='bg-neutral-600/50 text-lg font-bold capitalize px-4 py-2 rounded-md'>privous page</button>
        <button onClick={() => setPage(page + 1)} className='bg-neutral-600/50 text-lg font-bold capitalize px-4 py-2 rounded-md'>next page</button>
      </div>
      <div className="grid grid-cols-5 gap-y-8 gap-x-4 mt-5">
        {movies.map((movie: any) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
