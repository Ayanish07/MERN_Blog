import React, { useRef } from 'react'
import './Header.css';
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext';
const Header = () => {

  const {setInput, input}=useAppContext();
  const inputRef=useRef();

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear=()=>{
    setInput('');
    inputRef.current.value='';
  }

  return (
    <div className="Header-container">
      <div className="Header-text">
        <div className="feature-pill">
            <p className="feature-text">New: AI feature integrated</p>
            <img src={assets.star_icon} className="star-icon" alt="AI"/>
        </div>

        <h1 className='tagline'>Your Thoughts, Your Rules, <br/> Your <span>Blog</span>!</h1>
        
        <p className='description-paragraph'>Welcome to your own space on the internet — where your thoughts matter, your voice is heard, and your blog is truly yours. Whether you're here to share ideas, tell stories, or build your brand, this platform gives you the freedom to create without limits. Start writing, start owning, and let the world hear you!</p>
        
        <form className='search-form-container' onSubmit={onSubmitHandler}>
            <input ref={inputRef}   type="text" placeholder="Search for blogs..." required className="search-input"/>
            <button type='submit' className="search-button">Search</button>
        </form>
        <div className="clear-search-wrapper">
          {input && (
            <button onClick={onClear} className="clear-search-btn">Clear Search</button>
            )}
        </div>
      </div>
      </div>
  )
}

export default Header
