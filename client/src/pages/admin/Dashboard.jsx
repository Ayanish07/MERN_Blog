import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTable from '../../components/admin/BlogTable';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const {axios}=useAppContext();

  const fetchDashboard = async () => {
    try {
      const {data}=await axios.get('/api/admin/dashboard');
      if(data.success)
      {
        setDashboardData(data.dashboardData);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <img src={assets.dashboard_icon_1} alt="dashboard-icon" className="dashboard-icon" />
          <div>
            <p className="dashboard-count">{dashboardData.blogs}</p>
            <p className="dashboard-label">Blogs</p>
          </div>
        </div>

        <div className="dashboard-card">
          <img src={assets.dashboard_icon_2} alt="dashboard-icon" className="dashboard-icon" />
          <div>
            <p className="dashboard-count">{dashboardData.comments}</p>
            <p className="dashboard-label">Comments</p>
          </div>
        </div>

        <div className="dashboard-card">
          <img src={assets.dashboard_icon_3} alt="dashboard-icon" className="dashboard-icon" />
          <div>
            <p className="dashboard-count">{dashboardData.drafts}</p>
            <p className="dashboard-label">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='Latest-Blogs-Header'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        <div className='Latest-Blogs-table-holder'>
          <table className='Latest-Blogs-table'>
            <thead className='Latest-Blogs-heading'>
              <tr>
                <th scope='col' className='table-header'>#</th>
                <th scope='col' className='table-header'>Blog Title</th>
                <th scope='col' className='table-header'>Date</th>
                <th scope='col' className='table-header'>Status</th>
                <th scope='col' className='table-header'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog,index)=>{
                return <BlogTable key={blog._id} blog={blog}
                fetchBlogs={fetchDashboard} index={index+1}/>
              })}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
