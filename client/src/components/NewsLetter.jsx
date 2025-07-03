import React from 'react'
import './NewsLetter.css';
const NewsLetter = () => {
  return (
    <div className="newsletter-wrapper">
      <h1 className='Letter-heading'>Never miss a chance to publish your Blog!</h1>
      <p className='Letter-para'>Subscribe to get the latest blog, new tech and exclusive news and mail @ayanishkc@gmail.com for your exclusive blog publish request!</p>
      <form className='Letter-form'>
        <input type='text' placeholder='Enter your email id' required className='email-input'/>
        <button type='Submit' className='subscribe-button'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
