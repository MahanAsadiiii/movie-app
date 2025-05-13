import React from 'react'
import { MoviePoster } from './index';

export interface MovieInterface {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const MovieCard = (movie: any) => {
    const currentMovie = movie.movie
    const shortTitle = currentMovie.title.length > 18 ? currentMovie.title.slice(0, 18) + "..." : currentMovie.title;
    const movieRate = currentMovie.vote_average.toFixed(1)
    const releaseYear = currentMovie.release_date.split('-')[0]


    return (
        <div className='flex flex-col gap-2 h-full cursor-default'>
            <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                alt={currentMovie.title}
                id={currentMovie.id}
            />
            <div className="flex flex-col justify-center gap-2">
                <h3 className="text-white text-center text-md font-semibold bg-neutral-600/50 rounded-md py-1">
                    {shortTitle}
                </h3>
                <div className="flex justify-evenly">
                    <h6>{releaseYear}</h6>
                    <span>
                        |
                    </span>
                    <span className='text-[#de8214]'>
                        {movieRate}
                    </span>
                </div>
            </div>
        </div>
    )
}

export { MovieCard }