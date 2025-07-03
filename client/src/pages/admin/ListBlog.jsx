// ✅ ListBlog.jsx (Updated for local state updates)
import React, { useState, useEffect } from 'react';
import BlogTable from '../../components/admin/BlogTable';
import './ListBlog.css';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post('/api/blog/delete', { id });
      if (data.success) {
        toast.success(data.message);
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async (id) => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id });
      if (data.success) {
        toast.success(data.message);
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === id ? { ...blog, isPublished: !blog.isPublished } : blog
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="All-Blogs-holder">
      <h3>All Blogs</h3>
      <div className="Latest-Blogs-table-holder">
        <table className="Latest-Blogs-table">
          <thead className="Latest-Blogs-heading">
            <tr>
              <th scope="col" className="table-header">#</th>
              <th scope="col" className="table-header">Blog Title</th>
              <th scope="col" className="table-header">Date</th>
              <th scope="col" className="table-header">Status</th>
              <th scope="col" className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTable
                key={blog._id}
                blog={blog}
                index={index + 1}
                onDelete={deleteBlog}
                onToggle={togglePublish}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
