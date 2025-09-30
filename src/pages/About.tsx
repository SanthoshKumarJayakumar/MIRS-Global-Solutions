import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Eye, Zap, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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
            About MIRS Global Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-200 max-w-3xl mx-auto"
          >
            Pioneer in information technology-enabled services since 2022
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                MIRS Global Solutions focuses on being the pioneer in information technology-enabled services. 
                As a service provider, we provide high-quality project solutions through exceptional content 
                solutions and technology-enabled transformation.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We support clients in bringing out projects in the required form for the end-user in the 
                fastest possible time. Our core competences lie in supporting individuals and organizations 
                in their pursuit of the process of researching, gathering, organising, writing, and editing 
                the web content to be published on the website with good accessibility by all kinds of people.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We satisfy our customers by providing valuable creations with new technologies, subject matter 
                expertise with amazing innovations, and high-quality products.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="text-purple-600" size={32} />
                  </div>
                  <h4 className="font-bold text-2xl text-gray-800">100+</h4>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Team"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-800">Proprietor</h3>
                <p className="text-blue-600 font-semibold">S. Iniya</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 page-container">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a thriving start-up with a diverse set of talents and skills
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality & Accuracy',
                description: 'We ensure quality, consistency, and accuracy in all our deliverables',
                icon: CheckCircle
              },
              {
                title: 'World-class Capabilities',
                description: 'Gain access to world-class capabilities and best practices',
                icon: Award
              },
              {
                title: 'Enhanced Productivity',
                description: 'Constantly enhanced productivity through innovative solutions',
                icon: Zap
              },
              {
                title: 'Competitive Pricing',
                description: 'Superior services at competitive pricing for maximum value',
                icon: Target
              },
              {
                title: 'Customer Experience',
                description: 'Superior customer experience with dedicated support',
                icon: Users
              },
              {
                title: 'Performance Improvement',
                description: 'Business performance improvement through our solutions',
                icon: Eye
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 page-container">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-600 text-white p-8 rounded-lg"
            >
              <div className="flex items-center mb-6">
                <Target className="mr-4" size={32} />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To be the pioneer in information technology-enabled services by providing high-quality 
                project solutions that support clients in achieving their goals efficiently and effectively. 
                We aim to deliver exceptional content solutions and technology-enabled transformation 
                services that exceed customer expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-teal-600 text-white p-8 rounded-lg"
            >
              <div className="flex items-center mb-6">
                <Eye className="mr-4" size={32} />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To become a globally recognized leader in IT-enabled services, known for our innovation, 
                quality, and customer satisfaction. We envision a future where businesses of all sizes 
                can access world-class technology solutions that drive growth and success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
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
              Join the growing number of satisfied clients who trust MIRS Global Solutions 
              for their IT-enabled service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Get a Quote
              </Link>
              <Link 
                to="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;