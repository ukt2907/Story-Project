import React from 'react'
import '../utils/H1.css'

const H1 = ({title}) => {
  return (
    <div>
        <h1 className='story-heading'>Top Stories about {title}</h1>
    </div>
  )
}

export default H1