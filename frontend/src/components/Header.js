import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Navbar, Container } from 'react-bootstrap'
import SearchBox from './SearchBox'
import TitleHeader from './TitleHeader'
import { listCategories } from '../actions/categoryActions'


const Header = () => {
  // const pageNumber = match.params.pageNumber || 1
  const pageNumber = 1;
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCategories('', pageNumber))
   // console.log("categories are: ", categories);
  }, [dispatch, pageNumber])

  return (
    <header>
      { console.log("categories are: ", categories)}

      <TitleHeader />
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <div style={{ margin: "30px 10px" }} className="d-md-none " ><Route render={({ history }) => <SearchBox history={history} />} /></div>
            {
              categories.map((category) =>
                <li><a href={process.env.REACT_APP_URL + '/category/' + category.name}> {category.name} </a></li>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
