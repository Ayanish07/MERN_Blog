import React from 'react'
import './Footer.css';
import  { assets, footer_data } from '../assets/assets';
const Footer = () => {
  return (
    <div className="Footer-wrapper">
      <div className="Footer-links">

        <div>
            <img src={assets.logo} alt="logo" className='image'/>
            <p className='Logo-desc'>A blogging platform to express ideas, share knowledge, and connect with curious minds. Discover stories that inspire and insights that matter — one post at a time.</p>
        </div>
        <div className="Footer-grids">
            {footer_data.map((section,index)=>(
                <div key={index}>
                    <h3>{section.title}</h3>
                    <ul>
                        {section.links.map((link,i)=>(
                            <li key={i}>
                                <a href="#">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </div>
      <p className='Copyright'>Copyright 2025 © QuickBlog by Ayanish - All Rights Reserved.</p>
    </div>
  )
}

export default Footer;
