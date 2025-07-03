import React from 'react'
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({blog}) => {
    const {title,description,category,image,_id}=blog;
    const navigate=useNavigate();
  return (
    <div className="blog-card-wrapper" onClick={()=>navigate(`/blog/${_id}`)}>
        <img src={image} alt="" className='photo' />
        <span className="cat">{category}</span>
        <div className='Content'>
            <h5 className='title'>{title}</h5>
            <p className="Desc">
            {description.replace(/<[^>]+>/g, '').slice(0, 80)}...
            </p>
        </div>
    </div>
  )
}

export default BlogCard;
