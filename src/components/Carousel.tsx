import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  const slides = [
    {
      id: 1,
      title: 'Pioneer in IT-Enabled Services',
      subtitle: 'Transforming businesses through exceptional technology solutions',
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      cta: 'Discover Our Services',
      link: '/services'
    },
    {
      id: 2,
      title: 'Data Processing Excellence',
      subtitle: 'Comprehensive data entry, processing, and management solutions',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      cta: 'Learn More',
      link: '/about'
    },
    {
      id: 3,
      title: 'Publication & Content Services',
      subtitle: 'Professional ePub conversion and web content writing services',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      cta: 'Explore Services',
      link: '/services'
    },
    {
      id: 4,
      title: 'Research & Development',
      subtitle: 'MATLAB and Python-based project works with innovative solutions',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      cta: 'View Projects',
      link: '/services'
    },
    {
      id: 5,
      title: 'Quality & Innovation',
      subtitle: 'Delivering world-class capabilities with competitive pricing',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      cta: 'Get Started',
      link: '/contact'
    }
  ];

  return (
    <div className="relative h-[600px] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[600px]">
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <Link 
                  to={slide.link}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 transform hover:scale-105 inline-block"
                >
                  {slide.cta}
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;