import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {

  
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form  onSubmit={submitHandler} inline>
      <Form.Control
        className='search-input '
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        
      ></Form.Control>
      <Button type='submit' variant='outline-warning' className='search-btn'>
      <i className="fas fa-search"></i>
      </Button>
    </Form>
  )
}

export default SearchBox
