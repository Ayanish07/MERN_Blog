import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import './Blog.css';
import Moment from 'moment'; //for data,time,year formatting moment
import '../index.css';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';


const Blog = () => {
  const { id } = useParams();

  const {axios}=useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name,setName]=useState('');
  const [content,setContent]=useState('');

  const fetchBlogData = async () => {
    try{
      const {data}=await axios.get(`/api/blog/${id}`)
      data.success?setData(data.blog):toast.error(data.message)
    }catch(error){
      toast.error(error.message)
    }
  };

  const fetchComments = async () => {
    try {
      const {data}=await axios.post('/api/blog/comments',{blogId: id})
      if(data.success){
        setComments(data.comments);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  const addComment=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post('/api/blog/add-comments',{blog: id, name,content})
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    <div className='Blog-Page'>
      <Navbar />
      <img src={assets.gradientBackground} alt="" className='Background' /> {/* className='absolute -top-50 z-1 opacity-50' from image_b5d13e.png */}
      
      <div className='blog-header-content'> {/* Corresponds to the div with 'text-center mt-20 text-gray-600' in image_b5d13e.png */}
        <p className='published-date'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')} </p> {/* className='text-primary py-4 font-medium' from image_b5d13e.png */}
        <h1 className='blog-title'>{data.title}</h1> {/* className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800' from image_b5d13e.png */}
        <h2 className='blog-subtitle'>{data.subTitle}</h2> {/* className='my-5 max-w-lg truncate mx-auto' from image_b5d13e.png */}
        <p className='author-info'>Verified Blog <span style={{ color: '#5044E5' }}>✅</span></p> {/* className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary' from image_b5d13e.png */}
      </div>
      
      <div className='blog-main-content'>
        <img src={data.image} alt="image" className="Photo" />
        <div className="rich-text" dangerouslySetInnerHTML={{__html:data.description}}></div>
      </div>
      
      <div className='Comments'>
        <p>Comments ({comments.length})</p>

        <div className="Comments-section">
        {comments.map((item, index) => (
        <div key={index} className="Comment-Card">
        
        <div className="cc">
          <img src={assets.user_icon} alt="" className="user-photo" />
          <p className="user">{item.name}</p>
        </div>

        <p className="comment-content">{item.content}</p>

        <div className="comment-time">
          {Moment(item.createdAt).fromNow()}
        </div>
        
      </div>
    ))}
  </div>
</div>
          <div className='Comment-Panel'>
            <p>Add your comment!</p>
            <form onSubmit={addComment} className="Comment-form">
                <input type="text" placeholder="Enter your Name" required className='Comment-Name' onChange={(e)=>setName(e.target.value)} value={name}></input>
                <textarea placeholder="Comment!" className="Comment-area" onChange={(e)=>setContent(e.target.value)} value={content}></textarea>

                <button type="submit" className='Comment-submit'>Submit</button>
            </form>
          </div>
          <div className="Share-Section">
  <p className="share-text">Share this blog on your social media handles!</p>
  <div className="social-icons">
    <img src={assets.facebook_icon} alt="Facebook" />
    <img src={assets.twitter_icon} alt="Twitter" />
    <img src={assets.googleplus_icon} alt="Google Plus" />
  </div>
</div>

    </div>
    <Footer />
    </motion.div>
  ) : (<Loader/>);
};

export default Blog;