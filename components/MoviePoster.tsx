"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type MoviePosterProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    id: number
};

const MoviePoster = ({ src, alt, id }: MoviePosterProps) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className={`relative group `}

        >
            {/* skeleton for loading time */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
            )}

            {/* show button while hovering */}
            <div className='absolute hidden group-hover:flex group-hover:bg-black/70 justify-center items-center text-xl font-bold inset-0 text-white top-0 left-0 '>
                <Link href={`/movie/${id}`} className='font-medium text-xl px-4 py-2 bg-neutral-500 rounded-md capitalize cursor-pointer'>
                    watch
                </Link>
            </div>
            <Image
                src={src}
                alt={alt}
                height={300}
                width={200}
                className={` rounded-lg transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoadingComplete={() => setIsLoading(false)}
                unoptimized
            />
        </div >
    );
};

export { MoviePoster };
