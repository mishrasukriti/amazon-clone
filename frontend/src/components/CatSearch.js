import React, { useState } from 'react'


const CatSearch = ({ history }) => {
  

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/category/kitchen`)
    
  }

  return (
    <div>
      <button onClick={submitHandler} href="#">kitchen</button>
    </div>
   
  )
}

export default CatSearch
