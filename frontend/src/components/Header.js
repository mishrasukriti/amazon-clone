import React, { useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import CatSearch from './CatSearch'
import { logout } from '../actions/userActions'
import TitleHeader from './TitleHeader'
import {listCategories} from '../actions/categoryActions'


const Header = () => {
  // const pageNumber = match.params.pageNumber || 1
  const pageNumber = 1;
  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories, page, pages } = categoryList

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(()=>{
    dispatch(listCategories('', pageNumber))
    console.log("categories are: ", categories);
  },[dispatch, pageNumber])

  return (
     <header>
   { console.log("categories are: ", categories)}

      <TitleHeader />
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          <div style={{margin:"30px 10px"}} className="d-md-none " ><Route  render={({ history }) => <SearchBox history={history} />} /></div>
          { categories.map((category)=>
           <li><a href={process.env.REACT_APP_URL+'/category/'+category.name}> {category.name} </a></li>
           )
           
           }
            {/* <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
