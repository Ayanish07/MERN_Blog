import React, { useState } from 'react';
import './BlogList.css';
import { blogCategories, blog_data } from '../assets/assets';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blogs,input}=useAppContext();

  const filteredBlogs= ()=>{
    if(input===''){
      return blogs;
    }
    return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      {/* Category Navigation */}
      <div className="Navigate-Blog">
        {blogCategories.map((item) => (
          <div key={item} className="map">
            <button onClick={() => setMenu(item)}>{item}</button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="Blogs-Holder">
        {filteredBlogs()
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
