import React from 'react'
import { MoviePoster } from '@/components';
import Link from 'next/link';
import { MovieInterface } from '@/types/movie';

interface MovieCardProps {
    movie: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const shortTitle = movie.title.length > 18 ? movie.title.slice(0, 18) + "..." : movie.title;
    const movieRate = movie.vote_average ? movie.vote_average.toFixed(1) : '-'
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '-'


    return (
        <div className='flex flex-col gap-2 h-full cursor-default'>
            <MoviePoster
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                buttonLink={`/movie/${movie.id}`}
                buttonContent='more details'
            />
            <div className="flex flex-col justify-center gap-2">
                <Link href={`/movie/${movie.id}`}>
                    <h3 className="text-white text-center text-md font-semibold bg-neutral-600/50 rounded-md py-1">
                        {shortTitle}
                    </h3>
                </Link>
                <div className="flex justify-evenly">
                    <h6>{releaseYear}</h6>
                    <span>
                        |
                    </span>
                    <span className='text-amber-500'>
                        {movieRate}
                    </span>
                </div>
            </div>
        </div>
    )
}

export { MovieCard }