import React from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Login = () => {

  const {axios, setToken}=useAppContext();
  const navigate = useNavigate();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{

          const {data}=await axios.post('/api/admin/login',{email,password})
          if(data.success){
            setToken(data.token)
            localStorage.setItem('token',data.token)
            axios.defaults.headers.common['Authorization']=data.token;
            toast.success("Login successful");
            
            
          }
          else{
            toast.error(data.message);
          }

        }catch(error){
          toast.error(error.message);
        }
    }
  return (
    <div>
    <img src={assets.gradientBackground} className='Background'/>
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">
              <span className="highlight">Admin</span> Login
            </h1>
            <p className="login-subtext">Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit}>
                <div className='Credentials'>
                    <label> Email </label>
                    <input onChange={e=> setEmail(e.target.value)} value={email}
                    type='email' required className='form-input'placeholder='Enter your email id'/> 
                </div>

                <div className='Credentials'>
                    <label> Password </label>
                    <input onChange={e=> setPassword(e.target.value)} value={password}
                    type='password' required className='form-input'placeholder='Enter your password'/> 
                </div>
                <button type='submit' className='Submit-btn'>Login</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;

