import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom'
import { useStateContext } from '../contexts/ResultContextProvider';

const Results = () => {
    const { getResults, results, searchTerm, setSearchTerm, isLoading } = useStateContext();
    const location = useLocation();

    useEffect(() => {
        if (searchTerm !== '') {

            getResults(`${location.pathname}/q=${searchTerm}&num=30`);

        }

    }, [searchTerm, location.pathname])

    console.log(results)

    switch (location.pathname) {
        case '/search':
            return (
                <div className="sm:pl-56 w-full space-y-6">

                    {(results?.total &&
                        <h1 className='text-gray-500 dark:text-gray-700'>
                            About {results?.total} results ({parseFloat(results?.ts / 10)} seconds)
                        </h1>)
                    }

                    {results?.results?.map(({ link, title, description }, index) => (
                        <div key={index} className="md:w-2/5 sm:w-40 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">{link.length > 40 ? link.substring(0, 40) : link}</p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{title}</p>
                            </a>
                            <p className='text-sm'>
                                {description.length > 120 ? description.substring(0, 120) : description}
                            </p>
                        </div>
                    ))}

                    {
                        (results?.total &&
                            <>
                                <h1 className='text-2xl'>Related searches
                                </h1>

                                <div className='sm:pr-56 w-full grid grid-cols-2 gap-4'>
                                    {
                                        results?.answers.map((answer, index) => (
                                            <div key={index} className='text-center dark:bg-gray-50 dark:text-gray-900 bg-gray-200 border rounded-full p-1'>
                                                {answer}
                                            </div>
                                        ))
                                    }
                                </div>
                            </>

                        )

                    }
                </div >
            )
        case '/image':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results.map(({ image, link: { href, title } }, index) => (
                        <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                            <img src={image?.src} alt={title} loading="lazy" />
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                        </a>
                    ))}
                </div>
            )
        case '/news':
            return (
                <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
                    {results.map(({ id, links, source, title }) => (
                        <div key={id} className="md:w-2/5 w-full ">
                            <a href={links?.[0].href} target="_blank" rel="noreferrer " className="hover:underline ">
                                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                            </a>
                            <div className="flex gap-4">
                                <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {source?.href}</a>
                            </div>
                        </div>
                    ))}
                </div>
            )
        case '/video':
            return (
                <div className="flex flex-wrap justify-center ">
                    {results?.results?.map((video, index) => (
                        <div key={index} className="p-2">
                            <ReactPlayer url={video.additional_links[0].href} controls width="355px" height="200px" />
                        </div>
                    ))}
                </div>
            )
        default:
            return 'ERROR PATH NOT FOUND';
    }
}

export default Results