"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import alternativeImage from '@/public/assets/movie(1).png'

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
            className={`relative group h-full`}
        >
            {/* skeleton for loading time */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
            )}

            {/* show button while hovering */}
            <div className='absolute hidden group-hover:flex group-hover:bg-black/70 justify-center items-center text-xl font-bold inset-0 text-white top-0 left-0 '>
                <Link href={buttonLink} className='font-medium text-lg px-3 py-1.5 bg-neutral-600 rounded-md capitalize cursor-pointer'>
                    {buttonContent}
                </Link>
            </div>
            <div className="flex items-center">
                {src === 'https://image.tmdb.org/t/p/w300null'
                    ?
                    <Image src={alternativeImage} alt='' fill onLoad={() => setIsLoading(false)} className={`${isLoading ? 'opacity-0' : 'opacity-100'}`} />
                    :
                    <Image
                        src={src}
                        alt={alt}
                        height={0}
                        width={200}
                        priority
                        // style={{
                        //     width: '100%',
                        //     height: 'auto',
                        // }}
                        className={` rounded-lg transition-opacity duration-500 ease-in-out h-full w-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        unoptimized
                    />

                }
            </div>
        </div >
    );
};

export { MoviePoster };
