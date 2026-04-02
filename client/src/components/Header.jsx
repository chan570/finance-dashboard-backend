import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    user ? navigate('/result') : setShowLogin(true)
  }

  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Tagline Badge */}
      <motion.div
        className='text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best Text to Image Generator</p>
        <img src={assets.star_icon} alt="star icon" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10'
      >
        Turn text to{' '}
        <motion.span
          className='text-blue-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
        >
          image
        </motion.span>
        , in seconds
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className='text-center max-w-xl mx-auto mt-5 text-gray-600'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Turn your imagination into visuals with the power of AI! Our Text-to-Image Generator allows you to enter a simple description and instantly see a unique image generated from it.
      </motion.p>

      {/* Generate Button */}
      <motion.button
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-black mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Generate Images
        <img className='h-6' src={assets.star_group} alt="sparkles" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className='flex flex-wrap justify-center mt-16 gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(6).fill('').map((_, index) => (
          <motion.img
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt={`Generated sample ${index + 1}`}
            className='rounded cursor-pointer hover:scale-105 transition-all duration-300 max-sm:w-10'
            width={70}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </motion.div>

      {/* Footer Caption */}
      <motion.p
        className='mt-2 text-neutral-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Generated Images from Imagify
      </motion.p>
    </motion.div>
  )
}

export default Header
