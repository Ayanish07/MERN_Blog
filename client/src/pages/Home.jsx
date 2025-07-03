import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import './Home.css'; 
import NewsLetter from '../components/NewsLetter';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    <div className="home-container">
      {/* Background Image */}
      <Navbar />
      <Header />
      <img
        src={assets.gradientBackground}
        alt="background-gradient"
        className="global-background"
      />

      {/* Page Content */}
      
      <BlogList />
      <NewsLetter/>
      <Footer />
    </div>
    </motion.div>

  );
};

export default Home;
