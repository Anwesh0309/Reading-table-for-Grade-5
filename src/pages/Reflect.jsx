import React from 'react';
import { motion } from 'framer-motion';
import ReflectSummary from '../components/reflect/ReflectSummary';

const Reflect = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <ReflectSummary />
    </motion.div>
  );
};

export default Reflect;
