import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import './Comments.css'; 
import CommentTable from '../../components/admin/CommentTable';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const {axios}=useAppContext();

  const fetchComments = async () => {
    try {
     const {data}=await axios.get('/api/admin/comments')
     data.success? setComments(data.comments):toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };

  
  useEffect(() => {
    fetchComments();
  }, []);

  const approveComment = async (id) => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id });
      if (data.success) {
        toast.success(data.message);
        setComments((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, isApproved: true } : c
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const deleteComment = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;
  
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id });
      if (data.success) {
        toast.success(data.message);
        setComments((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  


  return (
    <div className='comments-box'>
      <div className='comments-header'>
        <h3 className='comments-title'>Comments</h3>
        <div className='filter-buttons'>
          <button
            className={`filter-btn ${
              filter === 'Approved' ? 'active-filter' : 'inactive-filter'
            }`}
            onClick={() => setFilter('Approved')}
          >
            Approved
          </button>

          <button
            className={`filter-btn ${
              filter === 'Not Approved' ? 'active-filter' : 'inactive-filter'
            }`}
            onClick={() => setFilter('Not Approved')}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="comments-table-container">
      <table className="comments-table">
        <thead className="comments-table-head">
      <tr>
        <th scope="col" className="comments-table-header">Blog Title & Comment</th>
        <th scope="col" className="comments-table-header hide-on-small">Date</th>
        <th scope="col" className="comments-table-header">Actions</th>
      </tr>
    </thead>
    <tbody>
      {comments.filter((comment)=>{
        if(filter==="Approved") return comment.isApproved===true;
        return comment.isApproved===false;
      }).map((comment,index)=><CommentTable 
      key={comment._id} 
      comment={comment} 
      index={index + 1} 
      onApprove={approveComment} 
      onDelete={deleteComment} 
    />)}
    </tbody>
  </table>
</div>
  

    </div>
  );
};

export default Comments;
