import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../img/logo.png'
import pin from '../img/pin.JPG'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import SearchBox from './SearchBox'

import { useDispatch, useSelector } from 'react-redux'
import cartimg from '../img/cart.JPG'
import CatSearch from './CatSearch'
import { logout } from '../actions/userActions'


const TitleHeader = () => {

    const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

    return(
        <div className="container-fluid main-header">
        <div className="row">
          <div style={{textAlign:"center"}} className="col-md-1 col-xs-3">
             <LinkContainer style={{display:"inline-block",textAlign:"center"}} to='/'>
            <Navbar.Brand><img className="logo-img" src={logo} /></Navbar.Brand>
          </LinkContainer>
          </div>
          <div style={{marginTop: "13px", marginLeft:"22px"}} className="col-md-3 d-none d-md-block">
              <div className="row">
                  <div className="col-md-1"><img className="pin-img" src={pin} /></div>
                  <div className="col-md-10">
                      <div style={{color:"#ccc"}}>Hello</div>
                      <div className="sel-address" style={{color:"white"}}>Select your address</div>
                  </div>
              </div>
         
          </div>
          <div style={{marginTop:"12px", marginLeft:"-115px"}} className="col-md-4 d-none d-md-block"><Route render={({ history }) => <SearchBox history={history} />} /></div>
         
          <div  className="col-md-4 col-xs-4">
          <Nav className='ml-auto'>
             
              {userInfo ? (
                // <NavDropdown title={`Hello, ${userInfo.name} ${<br/>} ll`} id='username'>
                <NavDropdown  title={
                  <span>
                  <span style={{color: "rgb(204, 204, 204)"}}>Hello, {userInfo.name}</span> <br></br>
                  <span className="sel-address" style={{fontWeight:"800"}}>Accounts & List</span>
                  </span>
              }  id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer style={{marginTop:"18px"}} className="sel-address" to='/login'>
                  <Nav.Link>
                    <i style={{fontSize:"21px"}}  className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown  title={
                  <span>
                  <span style={{color: "rgb(204, 204, 204)"}}>Admin Panel</span> <br></br>
                  <span className="sel-address" style={{fontWeight:"800"}}>Menu</span>
                  </span>
                } id='adminmenu'>
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
               <LinkContainer style={{paddingBottom:"0px"}} to='/cart'>
                <Nav.Link style={{paddingBottom:"0px"}}>
                 <img style={{position: "relative", top: "-8px"}} src={cartimg} /> <label style={{marginTop: "21px"}} className="sel-address">Cart</label>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </div>
        </div>
      </div>
    )
}

export default TitleHeader 