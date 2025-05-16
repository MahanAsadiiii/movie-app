import { PrimaryButton } from './PrimaryButton'

type NavigatorType = {
    query: string | undefined
    genre: string | undefined
    page: number
}

const Navigator = ({ query, genre, page }: NavigatorType) => {
    const currentParams = {
        ...(query && { query }),
        ...(genre && { genre }),
    };
    return (
        <div className={`flex gap-4 ${page >= 2 ? 'justify-between' : 'justify-end'} mt-5`}>
            {/* show privous button when page number is more than 2 */}
            {page >= 2 && <PrimaryButton context='Previous' href={`/?${new URLSearchParams({ ...currentParams, page: (page - 1).toString() }).toString()}`} />}
            <PrimaryButton context='Next' href={`/?${new URLSearchParams({ ...currentParams, page: (page + 1).toString() }).toString()}`} />
        </div>
    )
}

export { Navigator }