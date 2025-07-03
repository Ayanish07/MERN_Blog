import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import './AddBlog.css';
import Quill from 'quill';
import { blogCategories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import {parse} from 'marked'
const AddBlog = () => {

  const {axios}=useAppContext();
  const [isAdding, setIsAdding]=useState(false);
  const [loading, setLoading]=useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
   
    // Handle blog submission here
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog={
        title,subTitle,description: quillRef.current.root.innerHTML,
        category, isPublished
      }
      const formData=new FormData();
      formData.append('blog',JSON.stringify(blog));
      formData.append('image',image);

      const {data}=await axios.post('/api/blog/add',formData);

      if(data.success){
        toast.success(data.message);
        setImage(false);
        setTitle('');
        setSubTitle('');
        quillRef.current.root.innerHTML='';
        setCategory('Startup')
      }
      else{
        toast.error(data.message);
      }
      

    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if(!title)
      return toast.error('Please enter the title')
      
      try {
        setLoading(true);
        const {data}=await axios.post('/api/blog/generate',{prompt: title});
        if(data.success){
          quillRef.current.root.innerHTML=parse(data.content);
        }
        else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="upload-form">
      <div className="thumbnail-upload-section">
        <p className="upload-label">Upload Thumbnail</p>

        <label htmlFor="image" className="thumbnail-upload-label">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload Thumbnail"
            className="thumbnail-preview"
          />
          <input
            type="file"
            id="image"
            required
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <div className="blog-form">
          <div className="form-group">
            <p className="form-label">Blog Title</p>
            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <p className="form-label">Sub Title</p>
            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <p className="form-label">Blog Description</p>
            <div className="description-toolbar">
              <div className="editor-box" ref={editorRef}></div>
              <div className="generate-button-wrapper">
              <button
                  disabled={loading}
                  type="button"
                  className="ai-generate-btn"
                  onClick={generateContent}
                >
                {loading ? 'Generating...' : 'Generate with AI'}
              </button>

              </div>
            </div>
          </div>

          <div className="form-group">
            <p className="Blog-Category-head">Blog Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="category"
              className="Selection"
            >
              <option value="">Select Category</option>
              {blogCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Publish Checkbox */}
          <div className="checkbox-container">
            <p>Publish Now</p>
            <input
              type="checkbox"
              checked={isPublished}
              className="custom-checkbox"
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={isAdding}>
            {isAdding?'Adding...':'Add Blog'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
