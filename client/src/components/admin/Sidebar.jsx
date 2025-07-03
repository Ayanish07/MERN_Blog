import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>

      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active' : ''}`
        }
      >
        <img src={assets.home_icon} className="home-icon" alt="" />
        <p className="dashboard-text">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active' : ''}`
        }
      >
        <img src={assets.add_icon} className="home-icon" alt="" />
        <p className="dashboard-text">Add Blogs</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active' : ''}`
        }
      >
        <img src={assets.list_icon} className="home-icon" alt="" />
        <p className="dashboard-text">List Blogs</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active' : ''}`
        }
      >
        <img src={assets.comment_icon} className="home-icon" alt="" />
        <p className="dashboard-text">Comments</p>
      </NavLink>

    </div>
  );
};

export default Sidebar;
