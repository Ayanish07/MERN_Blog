import React from 'react'
import {assets} from '../assets/assets'
import './Navbar.css';
import {useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const {navigate, token}=useAppContext();

  return (
    <div className="navbar-container">
    <img src={assets.logo} alt="logo" className="navbar-logo" onClick={()=>navigate('/')}/>
    <button className="login-button" onClick={()=>navigate('/admin')}>
      {token?'Dashboard':'Login'} 
      <img src={assets.arrow} className="login-button-arrow" alt="arrow" />
    </button>
  </div>


  )
}

export default Navbar;
