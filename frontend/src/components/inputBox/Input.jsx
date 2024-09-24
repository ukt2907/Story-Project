import React from 'react'

const Input = ({type, placeholder}) => {
  return (
    <div>
      <input className='input' type={type} placeholder={placeholder} onClick={(e) => e.target.value = ''}  />
    </div>
  )
}

export default Input