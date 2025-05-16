'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const BackButton = ({ fallback = '/' }: { fallback?: string }) => {
    //get route for back to exact params that use before vist detail page
    const router = useRouter()

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    };

    return (
        <button
            onClick={handleBack}
            className='text-center text-md font-bold ease-in-out duration-200 bg-neutral-600/50 capitalize px-4 py-1.5 rounded-md cursor-pointer hover:bg-neutral-400'
        >
            Back
        </button>
    )
}

export { BackButton }