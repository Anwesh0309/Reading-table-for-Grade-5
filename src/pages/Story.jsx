import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StoryCarousel from '../components/story/StoryCarousel';

const Story = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto h-full min-h-0 py-2 md:py-4"
    >
      <StoryCarousel onComplete={() => navigate('/simulate')} />
    </motion.div>
  );
};

export default Story;
