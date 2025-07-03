import React from 'react';
import { assets } from '../../assets/assets';
import './CommentTable.css';

const CommentTable = ({ comment, index, onApprove, onDelete }) => {
  const { blog, createdAt } = comment;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="comment-row">
      <td className="comment-blog-details">
        <span className="label">Blog:</span> {blog.title}
        <br />
        <span className="label">Name:</span> {comment.name}
        <br />
        <span className="label">Comment:</span> {comment.content}
      </td>
      <td className="comment-date hide-on-small">{BlogDate.toLocaleDateString()}</td>
      <td className="comment-actions">
        <div className="actions-wrapper">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              className="action-icon tick-icon"
              title="Approve"
              onClick={() => onApprove(comment._id)} // ⬅️ triggers approve handler
            />
          ) : (
            <span className="approved-label">Approved</span>
          )}
          <img
            src={assets.bin_icon}
            alt="Delete"
            className="action-icon bin-icon"
            title="Delete"
            onClick={() => onDelete(comment._id)} // ⬅️ triggers delete handler
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
