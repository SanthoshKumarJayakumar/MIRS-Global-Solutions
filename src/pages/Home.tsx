import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, MapPin, Users, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import EnquiryForm from '../components/EnquiryForm';

const Home = () => {
  const services = [
    'Data Entry Services',
    'Data Processing Services',
    'Publication Services',
    'Data Conversion Services',
    'Web Content Writing',
    'Research Paper Writing',
  ];

  const benefits = [
    'Quality, consistency, and accuracy',
    'World-class capabilities',
    'Best practices, skills, and technology',
    'Enhanced Productivity',
    'Competitive Pricing',
    'Superior customer experience',
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Solutions Pvt Ltd',
      rating: 5,
      review: 'Mir\'s Global Solutions delivered exceptional data processing services. Their attention to detail and timely delivery exceeded our expectations.',
    },
    {
      name: 'Priya Sharma',
      company: 'Digital Marketing Agency',
      rating: 5,
      review: 'Outstanding web content writing services. The team understood our requirements perfectly and delivered high-quality content.',
    },
    {
      name: 'Arun Patel',
      company: 'Publishing House',
      rating: 5,
      review: 'Their ePub conversion services are top-notch. Professional approach and excellent results every time.',
    },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel />

      {/* About Us Section */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Mir's Global Solutions
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Mir's Global Solutions focuses on being the pioneer in information technology-enabled services. 
                As a service provider, we provide high-quality project solutions through exceptional content 
                solutions and technology-enabled transformation.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We support clients in bringing out projects in the required form for the end-user in the 
                fastest possible time. Our core competences lie in supporting individuals and organizations 
                in their pursuit of researching, gathering, organizing, writing, and editing web content.
              </p>
              <Link 
                to="/about"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors group inline-flex"
              >
                <span>Learn More</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mir's Global Solutions Team"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold">2022</h3>
                <p className="text-sm opacity-90">Established</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive IT-enabled services designed to meet your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <CheckCircle className="text-blue-600 group-hover:text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service}</h3>
                <p className="text-gray-600 mb-4">
                  Professional {service.toLowerCase()} with quality assurance and timely delivery.
                </p>
                <Link 
                  to="/services"
                  className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 font-medium group"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Features */}
      <section className="py-20 bg-blue-900 text-white page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits & Features
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Why choose Mir's Global Solutions for your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ready to transform your business with our IT-enabled services? 
                Contact us today for a free consultation and quote.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-blue-600" size={32} />
                  </div>
                  <h4 className="font-bold text-2xl text-gray-800">10+</h4>
                  <p className="text-gray-600">Team Members</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="text-green-600" size={32} />
                  </div>
                  <h4 className="font-bold text-2xl text-gray-800">2022</h4>
                  <p className="text-gray-600">Established</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Mir's?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">Quality & Accuracy Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">Competitive Pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600">
              548/1, Anna Nagar, Kitchipalayam, Salem-636015
            </p>
          </motion.div>
          
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.6926494446586!2d78.1460516!3d11.6643395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52421db%3A0x6de2fdf4cfd44427!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1645678901234!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;