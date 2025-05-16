import Link from 'next/link'

type PrimaryButtonType = {
    href: string
    context: string
}
// make a global button for standardize UI
const PrimaryButton = ({ href, context }: PrimaryButtonType) => {
    return (
        <Link href={href} className='text-center text-md font-bold ease-in-out duration-200 bg-neutral-600/50 capitalize px-4 py-1.5 rounded-md cursor-pointer hover:bg-neutral-400'>
            {context}
        </Link>
    )
}

export { PrimaryButton }