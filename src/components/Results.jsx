import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { useResultContext } from '../contexts/ResultContextProvider'
import Loading from './Loading';
import moment from 'moment';
import Pagination from './Pagination';

export default function Results() {
  const { results, isLoading, getResult, searchTerm } = useResultContext();
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10);
  
  const location = useLocation();
  
  useEffect(() => {
    if(searchTerm) {
      if (location.pathname === '/video') {
        getResult(`/search/q=${searchTerm} youtube videos&num=20`)
      } else {
        getResult(`${location.pathname}/q=${searchTerm}&num=101`)
      }
    }
  }, [searchTerm, location.pathname])

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentResults = results.slice(firstPostIndex, lastPostIndex)

  if (isLoading) return <Loading />

  switch (location.pathname) {
    case '/search':
      if (results.length === 0) {
        return (
          <p className="text-center mt-10 font-quicksand font-semibold">No data.</p>
        )
      } else {
        return (
          <div className='flex flex-col justify-between space-y-8 laptop:px-56'>
            <p className='font-quicksand font-medium'>About {results.length} results</p>
            {currentResults?.map(({ link, title, description }, index) => (
              <div key={index} className="w-full mt-5">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className='text-sm'>
                    {link.length > 60 ? link.substring(0, 60) : link}
                  </p>
                  <p className="text-2xl my-2 font-quicksand font-semibold hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <p className='font-quicksand font-medium text-gray-800 dark:text-gray-300 tracking-wide leading-relaxed subpixel-antialiased'>
                  {description}
                </p>
              </div>
            ))}
            <Pagination totalPosts={results.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        )
      }
    case '/image':
      if (results.length === 0) {
        return (
          <p className="text-center mt-10 font-quicksand font-semibold">No data.</p>
        )
      } else {
        return (
          <>
            <div className="flex flex-wrap justify-center items-center">
            {currentResults?.map(({ image, link: {href, title} }, index) => (
              <a className='sm:p-3 mt-5 p-5' href={href} key={index} target="_blank" rel="noreferrer">
                <img src={image?.src} alt={title} loading="lazy" height={150} width={150} />
                <p className='w-36 break-words text-sm mt-2'>
                  {title}
                </p>
              </a>
            ))}
            </div>
            <Pagination totalPosts={results.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </>
        )
      }
    case '/news':
      if (results.length === 0) {
        return (
          <p className="text-center mt-10 font-quicksand font-semibold">No data.</p>
        )
      } else {
        return (
          <>
            <div className='flex flex-wrap justify-between space-y-8 laptop:px-56'>
            <p className='font-quicksand font-medium'>About {results.length} results</p>
            {currentResults?.map(({ links, id, source, title, published, summary }) => (
              <div key={id} className="w-full mt-5">
                <div className='flex flex-row space-x-1'>
                  <p className='font-bold subpixel-antialiased'>{source?.title} •</p>
                  <a href={source?.href} target="_blank" rel="noreferrer" className='subpixel-antialiased hover:underline'>
                    {source?.href}
                  </a>
                </div>
                <a href={links?.[0].href} target="_blank" rel="noreferrer" className='hover:underline'>
                  <p className="text-2xl font-quicksand my-2 subpixel-antialiased font-semibold hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className='flex gap-4'>
                  <div className='subpixel-antialiased tracking-wide leading-relaxed' dangerouslySetInnerHTML={{ __html: summary }}></div>
                </div>
                <p className='mt-4 font-normal text-gray-500 subpixel-antialiased'>{moment(published).fromNow()}</p>
              </div>
            ))}
          </div>
          <Pagination totalPosts={results.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </>
        )
      }
    case '/video':
      if (results.length === 0) {
        return (
          <p className="text-center mt-10 font-quicksand font-semibold">No data.</p>
        )
      } else {
        return (
          <div className="w-full justify-center items-center">
            {results.map((video, index) => (
              <>
                <div key={index} className="p-2 mb-3 mt-5">
                  <div className='flex flex-row videoSm:flex-col'>
                    {
                      video?.additional_links?.[0]?.href && 
                      <>
                        <ReactPlayer url={video.additional_links?.[0].href} controls width={355} height={200} />
                        <a href={video.link} target="_blank" rel="noreferrer" className='font-quicksand font-bold ml-4 videoSm:mt-3 hover:underline'>
                          <p className="text-xl mb-3 dark:text-blue-300 text-blue-700">
                            {video.title}
                          </p>
                        </a>
                      </>
                    }
                  </div>
                </div>
              </>
            ))}
          </div>
        )
      }
    default:
      return 'ERROR'
  }
}