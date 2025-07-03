import React from 'react';
import { assets } from '../../assets/assets';
import './BlogTable.css';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const BlogTable = ({ blog, index, onDelete, onToggle }) => {
  const BlogDate = new Date(blog.createdAt);

  return (
    <tr className="blog-row">
      <th className="blog-cell index-cell">{index}</th>
      <td className="blog-cell title-cell">{blog.title}</td>
      <td className="blog-cell date-cell">{BlogDate.toDateString()}</td>
      <td className="blog-cell status-cell">
        <p className={blog.isPublished ? 'published' : 'unpublished'}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className="blog-cell actions-cell">
        <button onClick={() => onToggle(blog._id)} className="publish-btn">
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          src={assets.cross_icon}
          className="delete-icon"
          alt="delete"
          onClick={() => onDelete(blog._id)}
        />
      </td>
    </tr>
  );
};

export default BlogTable;
