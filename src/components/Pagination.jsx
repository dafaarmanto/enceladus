import React from 'react'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className='text-center'>
      {
        pages.map((page, index) => (
          <button className={page === currentPage ? 'font-quicksand font-bold text-gray-900 p-3 mx-4 my-4 dark:text-white hover:underline' : 'font-quicksand font-bold text-gray-400 p-3 mx-4 my-4 hover:underline hover:text-gray-600'} type='button' key={index} onClick={() => setCurrentPage(page)} >{page}</button>
        ))
      }
    </div>
  )
}

export default Pagination