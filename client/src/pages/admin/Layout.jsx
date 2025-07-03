import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  

  const {axios, setToken, navigate}=useAppContext();
  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization']=null;
    setToken(null);
    navigate('/');
  }

  return (
    <>
      <div className="navbar">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
          className="navbar-logo"
        />
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      {/* ✅ Wrap sidebar and outlet in layout-container */}
      <div className="layout-container">
        <div className="sidebar">
          <Sidebar />
        </div>

        <main className="layout-content">
          <Outlet /> {/* Renders nested route content */}
        </main>
      </div>
    </>
  );
};

export default Layout;
