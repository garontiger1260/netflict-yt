import React, { useRef } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Thumbnail from './Thumbnail'

const Row = ({ title, movies }) => {
    const rowRef = useRef(null)

    const handleClick = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            console.log(`ฺBefore scrollLeft:${scrollLeft}, clientWidth:${clientWidth}`)
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;

            console.log(`After scrollLeft:${scrollTo}`)
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };
    return (
        <div className='space-y-0.5 md:space-y-2'>
            <h2 className='w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
                {title}
            </h2>
            <div className='group relative md:ml-2'>
                <BiChevronLeft onClick={() => handleClick("left")} className='absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100' />

                <div className='flex items-center space-x-5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide' ref={rowRef}>
                    {movies.map(movie => <Thumbnail key={movie.id} movie={movie}></Thumbnail>)}
                </div>

                <BiChevronRight onClick={() => handleClick("right")} className='absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100' />
            </div>
        </div>
    )
}

export default Row