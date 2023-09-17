import Link from 'next/link'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const DATA = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
    { id: 4, name: 'Jill' },
    { id: 5, name: 'John' },
    { id: 6, name: 'Jane' },
    { id: 7, name: 'Jack' },
    { id: 8, name: 'Jill' },
    { id: 9, name: 'John' }
]

const LIMIT = 3

const getData = async (page: number) => {
    await wait(1000)

    const offset = (page - 1) * LIMIT
    const data = DATA.slice(offset, offset + LIMIT)

    return data
}

export default async function Home({ searchParams }: { searchParams: { page: number } }) {
    const page = searchParams.page ? Number(searchParams.page) : 1
    const data = await getData(page)

    return (
        <>
            <ul className='text-center'>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.id}: {item.name}
                    </li>
                ))}
            </ul>
            <div className='flex justify-center gap-2 mt-1s'>
                {[1, 2, 3].map((item) => (
                    <Link key={item} href={`/?page=${item}`} className={`p-1 ${page === item ? 'underline' : ''}`}>
                        Page {item}
                    </Link>
                ))}
            </div>
        </>
    )
}
