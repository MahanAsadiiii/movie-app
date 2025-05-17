'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface GenreInterface {
    name: string;
    id: number;
}

interface GenreFilterProps {
    genres: GenreInterface[];
}

const GenreFilter = ({ genres }: GenreFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get the current genre from the URL
    const genreParam = searchParams.get('genre') || '';


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        const genre = e.target.value;

        if (genre) {
            params.set('genre', genre);
        } else {
            params.delete('genre');
        }

        // Reset page to 1
        params.delete('page');

        router.push(`/?${params.toString()}`);
    };

    return (
        <select
            name="genre"
            value={genreParam}
            onChange={handleChange}
            className="border border-neutral-600 rounded py-1 bg-black"
        >
            <option value="">All genres</option>
            {genres?.map((item: GenreInterface) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
}

export { GenreFilter }