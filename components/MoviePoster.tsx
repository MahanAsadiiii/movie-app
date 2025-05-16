"use client"
import { useState } from 'react';
import Image from 'next/image';
import alternativeImage from '@/public/assets/movie(1).png'
import { PrimaryButton } from './PrimaryButton';

type MoviePosterProps = {
    src: string;
    alt: string;
    buttonContent: string,
    buttonLink: string
};

const MoviePoster = ({ src, alt, buttonLink, buttonContent }: MoviePosterProps) => {

    const [isLoading, setIsLoading] = useState(true);

    return (

        <div
            className={`relative flex group h-full w-full`}
        >
            {/* skeleton for loading time */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
            )}

            {/* show button while hovering */}
            <div className='absolute hidden group-hover:flex group-hover:bg-black/70 justify-center items-center inset-0 text-white top-0 left-0 z-10'>
                <PrimaryButton context={buttonContent} href={buttonLink} />
            </div>
            <div className="flex items-center h-full">
                {/* showing alternative Image when movie doesnt have image */}
                {src === 'https://image.tmdb.org/t/p/w500null'
                    ?
                    <Image src={alternativeImage}
                        alt='alternative Image'
                        fill
                        onLoad={() => setIsLoading(false)}
                        className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`} />
                    :
                    <Image
                        src={src}
                        alt={alt}
                        priority
                        className={` rounded-lg transition-opacity duration-500 ease-in-out w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        unoptimized
                        fill
                    />
                }
            </div>
        </div >
    );
};

export { MoviePoster };
