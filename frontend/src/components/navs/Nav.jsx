import './nav.css'
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Registerpagestyle from '../registerPage/Registerpagestyle';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleRegister = () => {
     setIsRegister(!isRegister);
  }

 

  return (
   <div className='nav-container'>
    <nav className='nav'>
        <button className='register' onClick={handleRegister}>Register Now</button>
         {/* Register Box */}
      {isRegister && (
    <div className='register-modal'>
      <Registerpagestyle />
    </div>
      )}
        
        <button className='signin' onClick={() => navigate('/login')}>Sign in</button>
        <IoMenuOutline className='menu' onClick={handleToggle} />
    </nav>
    {/* <div className={isOpen ? 'nav-slide active' : 'nav-slide'}>
      <div className='nav-slide-content'>
        <button className='button' onClick={() => navigate('/login')}>Login</button>
        <button className='button' onClick={() => navigate('/register')}>Register</button>
        <RxCross1 className='close' onClick={handleToggle} />
      </div>
    </div> */}
   </div>

  )
}


export default Nav
