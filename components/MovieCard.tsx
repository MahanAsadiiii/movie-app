import React from 'react'
import { MoviePoster, PrimaryButton } from '@/components';
import { MovieInterface } from '@/types/movie';

interface MovieCardProps {
    movie: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    //for better UI slice words after 14 length and round rate and show only year of release date
    const shortTitle = movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title;
    const movieRate = movie.vote_average ? movie.vote_average.toFixed(1) : '-'
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '-'


    return (
        <div className='flex flex-col gap-2 md:h-[355px] cursor-default'>
            <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                buttonLink={`/movie/${movie.id}`}
                buttonContent='more details'
            />
            <div className="flex flex-col justify-center gap-2">
                <PrimaryButton context={shortTitle} href={`/movie/${movie.id}`} />
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