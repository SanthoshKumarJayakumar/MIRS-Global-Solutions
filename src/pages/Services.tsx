import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, BookOpen, RefreshCw, Presentation as PresentationChart, Globe, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    {
      id: 'data-entry',
      title: 'Data Entry Services',
      icon: Database,
      color: 'blue',
      services: [
        'Excel Data Entry Services',
        'Image Data Entry Services',
        'Insurance Data Entry Services',
        'Numeric and Text Data Entry Services',
        'Accounting Data Entry Services',
        'MS Access Data Entry Services',
        'Offline Data Entry Services',
        'Online Data Entry Services',
        'Questionnaire Data Entry Services',
        'Web Data Entry Services',
        'XML Data Entry Services',
        'Data Capture Services',
        'Data Cleansing Services',
        'Document Imaging Systems'
      ]
    },
    {
      id: 'data-processing',
      title: 'Data Processing Services',
      icon: RefreshCw,
      color: 'green',
      services: [
        'Form Processing Services',
        'Image Processing Services',
        'Insurance Claims Processing Services',
        'Survey Processing Services',
        'Check Processing Services'
      ]
    },
    {
      id: 'publication',
      title: 'Publication Services',
      icon: BookOpen,
      color: 'purple',
      services: [
        'ePub Conversion Services',
        'Fixed Layout ePub Conversion',
        'Read Aloud ePub Conversion',
        'Enhanced ePub Conversion',
        'Flash Flip Book Conversion',
        'KF8 Conversion Services',
        'Nook Fixed Layout Format',
        'MobiPocket (Kindle) Conversion'
      ]
    },
    {
      id: 'data-conversion',
      title: 'Data Conversion Services',
      icon: FileText,
      color: 'orange',
      services: [
        'HTML Conversion Services',
        'PDF Conversion Services',
        'SGML Conversion Services',
        'XML Conversion Services',
        'Book Conversion Services',
        'Catalog Conversion Services',
        'Document Conversion Services'
      ]
    },
    {
      id: 'presentation',
      title: 'Presentation Services',
      icon: PresentationChart,
      color: 'red',
      services: [
        'Logo Design',
        'PowerPoint Presentations',
        'Flash Presentations',
        'Flash to HTML5',
        'Graphics / Image Editing'
      ]
    },
    {
      id: 'web-content',
      title: 'Web Content Writing',
      icon: Globe,
      color: 'teal',
      services: [
        'Website Copywriting Services',
        'Blog Writing Services',
        'Web Content Development Services',
        'SEO Content Writing Services',
        'Product Review Writing Services',
        'Research Article Writing',
        'Online Content Marketing Services',
        'Company Profile Writing Services',
        'Product Description Writing Services'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Solutions Pvt Ltd',
      rating: 5,
      review: 'Outstanding data entry services with perfect accuracy and timely delivery.',
      service: 'Data Entry'
    },
    {
      name: 'Priya Sharma',
      company: 'Digital Marketing Agency',
      rating: 5,
      review: 'Exceptional web content writing that perfectly matches our brand voice.',
      service: 'Content Writing'
    },
    {
      name: 'Arun Patel',
      company: 'Publishing House',
      rating: 5,
      review: 'Professional ePub conversion services with excellent quality output.',
      service: 'Publication'
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-600' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', hover: 'hover:bg-teal-600' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-200 max-w-3xl mx-auto"
          >
            Comprehensive IT-enabled services designed to meet your business needs
          </motion.p>
        </div>
      </section>

      {/* Service Filters */}
      <section className="py-12 bg-gray-50 page-container">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100'
              }`}
            >
              All Services
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <div className="grid gap-12">
            {filteredCategories.map((category, index) => {
              const colorClasses = getColorClasses(category.color);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className={`${colorClasses.bg} p-6`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <category.icon className={colorClasses.text} size={24} />
                      </div>
                      <h2 className={`text-2xl font-bold ${colorClasses.text}`}>
                        {category.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.services.map((service, serviceIndex) => (
                        <motion.div
                          key={service}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: serviceIndex * 0.05 }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                        >
                          <CheckCircle className={`${colorClasses.text} flex-shrink-0`} size={16} />
                          <span className="text-gray-700 group-hover:text-gray-900">{service}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link 
                        to="/contact"
                        className={`${colorClasses.hover} hover:text-white ${colorClasses.text} border-2 border-current px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 group`}
                      >
                        <span>Get Quote</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Additional Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We also offer specialized services to meet specific business requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Management Services',
                services: ['Data Abstraction', 'Data Analytics', 'Database Development & Migration', 'Document Management Services']
              },
              {
                title: 'Copy Editing Services',
                services: ['Academic Copy Editing', 'Business Document Editing', 'Technical Copy Editing', 'Content Proofreading']
              },
              {
                title: 'MATLAB & Python Projects',
                services: ['Data Analysis Projects', 'Machine Learning Implementation', 'Algorithm Development', 'Research Paper Support']
              },
              {
                title: 'Transcription Services',
                services: ['Audio Transcription', 'Video Transcription', 'Medical Transcription', 'Legal Transcription']
              },
              {
                title: 'Accessibility Services',
                services: ['Web Accessibility Audits', 'Document Accessibility', 'WCAG Compliance', 'Screen Reader Testing']
              },
              {
                title: 'Research Paper Writing',
                services: ['Academic Research', 'Literature Review', 'Data Collection', 'Statistical Analysis']
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.services.map((item) => (
                    <li key={item} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
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
              Hear from our satisfied clients about their experience with our services
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
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {testimonial.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white page-container">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and get a free quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Get Free Quote
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;