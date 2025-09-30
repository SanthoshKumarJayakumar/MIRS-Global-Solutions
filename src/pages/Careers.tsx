import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    experience: '',
    resume: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Debug submitStatus changes
  React.useEffect(() => {
    console.log('SubmitStatus changed to:', submitStatus);
  }, [submitStatus]);

  // Auto-dismiss toasts and scroll to message
  React.useEffect(() => {
    if (submitStatus) {
      // Scroll to the message after a short delay to ensure it's rendered
      setTimeout(() => {
        const messageElement = document.getElementById(
          submitStatus === 'success' ? 'success-message' : 'error-message'
        );
        if (messageElement) {
          messageElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);

      // Auto-dismiss both success and error messages after 5 seconds
      const timer = setTimeout(() => {
        setSubmitStatus('');
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const jobOpenings = [
    {
      id: 1,
      title: 'Data Entry Specialist',
      department: 'Data Services',
      location: 'Salem, Tamil Nadu',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Looking for detail-oriented individuals to handle data entry operations with high accuracy and speed.',
      requirements: [
        'Proficiency in MS Excel and data entry software',
        'Typing speed of at least 40 WPM',
        'Attention to detail and accuracy',
        'Basic computer knowledge'
      ]
    },
    {
      id: 2,
      title: 'Content Writer',
      department: 'Content Services',
      location: 'Salem, Tamil Nadu',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Seeking creative content writers to produce engaging web content, blog posts, and marketing materials.',
      requirements: [
        'Excellent written English communication',
        'SEO knowledge preferred',
        'Experience in various content formats',
        'Research and writing skills'
      ]
    },
    {
      id: 3,
      title: 'Data Processing Analyst',
      department: 'Data Services',
      location: 'Salem, Tamil Nadu',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our team to analyze and process complex data sets for various client projects.',
      requirements: [
        'Strong analytical skills',
        'Experience with data processing tools',
        'Knowledge of databases and SQL',
        'Problem-solving abilities'
      ]
    }
  ];

  const benefits = [
    'Competitive salary packages',
    'Health insurance coverage',
    'Professional development opportunities',
    'Flexible working hours',
    'Team building activities',
    'Performance-based incentives',
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation (only alphabets and spaces)
    if (!applicationData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(applicationData.name)) {
      newErrors.name = 'Name should contain only alphabets';
    }

    // Email validation
    if (!applicationData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (10 digits)
    if (!applicationData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(applicationData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Location validation (only alphabets and spaces)
    if (!applicationData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (!/^[a-zA-Z\s,.-]+$/.test(applicationData.location)) {
      newErrors.location = 'Location should contain only alphabets';
    }

    // Position validation
    if (!applicationData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    // Experience validation
    if (!applicationData.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    // Resume validation (URL format)
    if (!applicationData.resume.trim()) {
      newErrors.resume = 'Resume/CV link is required';
    } else if (!/^https?:\/\/.+/.test(applicationData.resume)) {
      newErrors.resume = 'Please enter a valid URL (starting with http:// or https://)';
    }

    // Cover letter validation
    if (!applicationData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (applicationData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = 'Cover letter should be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setApplicationData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const companyValues = [
    {
      title: 'Innovation',
      description: 'We encourage creative thinking and innovative solutions.',
      icon: '💡'
    },
    {
      title: 'Quality',
      description: 'We maintain the highest standards in all our deliverables.',
      icon: '⭐'
    },
    {
      title: 'Teamwork',
      description: 'We believe in the power of collaborative work.',
      icon: '🤝'
    },
    {
      title: 'Growth',
      description: 'We support continuous learning and career advancement.',
      icon: '📈'
    }
  ];

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('career_applications')
        .insert([{
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          location: applicationData.location,
          position: applicationData.position,
          experience: applicationData.experience,
          resume: applicationData.resume,
          cover_letter: applicationData.coverLetter,
        }]);

      if (dbError) {
        throw new Error('Failed to save application');
      }

      // Send email via edge function using Supabase client
      console.log('Calling edge function with data:', {
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        location: applicationData.location,
        position: applicationData.position,
        experience: applicationData.experience,
        resume: applicationData.resume,
        cover_letter: applicationData.coverLetter,
      });

      const { data: emailResult, error: emailError } = await supabase.functions.invoke('send-career-application-email', {
        body: {
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          location: applicationData.location,
          position: applicationData.position,
          experience: applicationData.experience,
          resume: applicationData.resume,
          cover_letter: applicationData.coverLetter,
        },
      });

      console.log('Edge function response:', { emailResult, emailError });

      if (emailError) {
        console.error('Email function error:', emailError);
        throw new Error(`Failed to send email notification: ${emailError.message || 'Unknown error'}`);
      }

      console.log('Email sent successfully:', emailResult);

      console.log('Setting submit status to success');
      setSubmitStatus('success');
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        location: '',
        position: '',
        experience: '',
        resume: '',
        coverLetter: '',
      });
      setErrors({});
      
      // Show success message for 5 seconds before closing modal
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitStatus('');
      }, 5000);
    } catch (error) {
      console.error('Application submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSubmitStatus(`error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setApplicationData(prev => ({ ...prev, position: jobTitle }));
    setErrors({});
    setSubmitStatus('');
    setShowApplicationForm(true);
  };

  return (
    <div>
      {/* Success Toast */}
      {submitStatus === 'success' && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[60] animate-pulse" id="success-message">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Application submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {submitStatus.startsWith('error') && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[60]" id="error-message">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{submitStatus.replace('error: ', '')}</span>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-200 max-w-3xl mx-auto"
          >
            Build your career with Mir's Global Solutions and be part of our growing success story
          </motion.p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a thriving start-up with diverse talents, ambitious young professionals, and a culture of teamwork
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Employee Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our current job opportunities and find the perfect role for your career growth
            </p>
          </motion.div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Briefcase size={16} />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job.title)}
                    className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 group"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">{job.description}</p>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Apply for {selectedJob}
            </h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">✅ Thank you! Your application has been submitted successfully and we'll get back to you soon.</span>
                </div>
                <button
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSubmitStatus('');
                  }}
                  className="text-green-600 hover:text-green-800 ml-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {submitStatus.startsWith('error') && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {submitStatus.replace('error: ', '')}
              </div>
            )}
            
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={applicationData.location}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  name="experience"
                  value={applicationData.experience}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV Link *
                </label>
                <input
                  type="url"
                  name="resume"
                  value={applicationData.resume}
                  onChange={handleInputChange}
                  required
                  placeholder="https://drive.google.com/..."
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.resume ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.resume && (
                  <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us why you're interested in this position..."
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.coverLetter ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.coverLetter && (
                  <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>
                )}
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  <Send size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Application Process */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Application Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple and transparent hiring process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Apply Online', description: 'Submit your application through our website' },
              { step: '02', title: 'Initial Screening', description: 'We review your application and qualifications' },
              { step: '03', title: 'Interview', description: 'Interview with our hiring team' },
              { step: '04', title: 'Join Our Team', description: 'Welcome to Mir\'s Global Solutions!' }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;