import { notFound } from 'next/navigation';
import axios from 'axios';

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            },
        });

        const movie = response.data;

        return (
            <div className="">
                <h1 className='text-xl'>{movie.title}</h1>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <p>{movie.overview}</p>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Vote Average:</strong> {movie.vote_average}</p>
            </div>
        );
    } catch (error) {
        // show 404 if movie is not found
        notFound();
        return null;
    }
}
