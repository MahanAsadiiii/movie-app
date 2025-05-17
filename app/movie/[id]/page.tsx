import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BackButton, MoviePoster } from '@/components';
import { fetchMoviesDetail } from '@/lib/moviesDetail';



type PageProps = {
    params: Promise<{ id: string }>;
};


export default async function MovieDetailPage({ params }: PageProps) {
    // cause its SSR, get Params from url and pass it to fetchmovieDetail to get data from it and show in UI  
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        const movie = await fetchMoviesDetail(id)

        // rounded movie rate
        const movieRate = movie.vote_average.toFixed(1)
        // add dot after 3 character
        const movieBudget = movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const movieRevenue = movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return (
            <section className="flex flex-col md:flex-row items-stretch justify-between gap-8 px-3 md:px-0 py-5 cursor-default min-h-dvh ">
                <div className="md:w-1/2 flex flex-col items-center gap-5 ">
                    <div className="flex justify-start w-full">
                        {/* for navigate to previous page I use this component */}
                        <BackButton />
                    </div>
                    <MoviePoster
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        buttonLink={movie.homepage}
                        buttonContent="explore movie's website"
                    />
                </div>
                <section className="flex flex-col gap-6 md:w-1/2 ">
                    <div className="flex flex-col gap-3">
                        <h1 className='text-4xl font-extrabold'>{movie.title}</h1>
                        <h3 className='text-lg font-extrabold italic'>{movie.tagline}</h3>
                        <ul className='flex gap-4 flex-wrap'>
                            {movie.genres.map((item: { id: number, name: string }) => (
                                <li key={item.id} className='text-sm text-amber-500 border-amber-500 border-1 font-semibold bg-neutral-600/50 px-4 py-1 rounded-md'>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    {/* movie discription */}
                    <p className='font-medium text-lg text-justify italic'>{movie.overview}</p>
                    {/* movie information */}
                    <div className="flex justify-start gap-5">
                        <div className="flex flex-col gap-2">
                            <h5 className='font-bold'>Vote Average:
                                <span className='ml-2 font-medium text-sm text-amber-500'>
                                    <strong className='font-bold text-xl'>{movieRate}</strong>
                                    /10
                                </span>
                            </h5>
                            <h5 className='font-bold'>Language:
                                <span className='ml-2 font-normal capitalize text-amber-500'>
                                    {movie.original_language}
                                </span>
                            </h5>
                            <h5 className='font-bold'>Release Date:
                                <span className='ml-2 font-medium text-amber-500'>
                                    {movie.release_date}
                                </span>
                            </h5>
                            <h5 className='font-bold'>Vote count:
                                <span className='ml-2 font-medium text-amber-500'>
                                    {movie.vote_count}
                                </span>
                            </h5>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className='font-bold'>Popularity:
                                <span className='ml-2 font-medium text-amber-500'>
                                    {movie.popularity}
                                </span>
                            </h5>
                            <h5 className='font-bold'>Runtime:
                                <span className='ml-2 font-medium text-amber-500'>
                                    {movie.runtime} min.
                                </span>
                            </h5>
                            <h5 className='font-bold'>Budget:
                                <span className='ml-2 font-medium text-amber-500 capitalize'>
                                    {movieBudget == 0 ? "doesn't mention" : `${movieBudget}$`}
                                </span>
                            </h5>
                            <h5 className='font-bold'>Revenvue:
                                <span className='ml-2 font-medium text-amber-500 capitalize'>
                                    {movieRevenue == 0 ? "doesn't mention" : `${movieRevenue}$`}
                                </span>
                            </h5>

                        </div>
                    </div>
                    {/* production countries */}
                    <div className="flex flex-col gap-2">
                        <h5 className='font-bold capitalize'>production countries:</h5>
                        <div className="flex gap-3 items-center flex-wrap">
                            {movie.production_countries.map((country: { name: string }, index: number) => (
                                <h5 key={index} className='font-medium text-amber-500'>{(index) + 1} - {country.name}</h5>
                            ))}
                        </div>
                    </div>
                    {/* companies name if it doesnt have image it shows name of it */}
                    <div className="flex flex-col gap-2">
                        <h5 className='font-bold capitalize'>production companies:</h5>
                        <div className="flex gap-3 items-center flex-wrap">
                            {movie.production_companies.map((comp: { id: number, name: string, logo_path: string }) => (
                                (comp.logo_path === null ?
                                    <h5 key={comp.id} className='p-2 border rounded-md'>{comp.name}</h5>
                                    :
                                    <Image
                                        key={comp.id}
                                        alt={comp.name}
                                        src={`https://image.tmdb.org/t/p/w200${comp.logo_path}`}
                                        width={100} height={0}
                                        className='bg-white p-2 rounded-md h-10' />
                                )
                            ))}
                        </div>
                    </div>
                </section>
            </section>
        );
    } catch (error) {
        // show 404 if movie is not found
        console.error(error);
        notFound();
    }
}
