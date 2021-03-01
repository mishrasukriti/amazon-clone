import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CategoryPaginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  console.log("inside categoryPaginate: pages ans page are: ",typeof pages," ",page);
  return (
    pages >= 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (

          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/categorylist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default CategoryPaginate
