import React, { useEffect } from "react";
import {
  FaCertificate,
  FaRobot,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import heroImg from "/hero-image.jpg";
import Navbar from "../components/Nav";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-teal-50 to-teal-100 pt-28"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6" data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Best Online Education Expertise
            </h2>
            <p className="text-lg text-gray-600">
              Learn at your own pace with expert instructors and AI-powered
              guidance for a better learning journey.
            </p>
            <div className="flex space-x-4">
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 transition-all transform hover:-translate-y-1 hover:shadow-xl">
                View Courses
              </button>
              <button className="flex items-center gap-2 bg-white border border-teal-600 text-teal-600 px-6 py-3 rounded-lg shadow-lg hover:bg-teal-50 transition-all transform hover:-translate-y-1 hover:shadow-xl">
                <FaRobot /> Search with AI
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="md:w-1/2 flex justify-center mt-8 md:mt-0"
            data-aos="fade-left"
          >
            <img
              src={heroImg}
              alt="Student"
              className="w-96 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3
            className="text-3xl font-bold text-gray-900 mb-10"
            data-aos="fade-up"
          >
            Why Choose Our Courses?
          </h3>
          <div className="grid gap-10 md:grid-cols-3">
            {/* Benefit 1 */}
            <div
              className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaBookOpen className="text-teal-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Expert-Led Classes</h4>
              <p className="text-gray-600">
                Learn directly from industry professionals with years of
                experience.
              </p>
            </div>
            {/* Benefit 2 */}
            <div
              className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaRobot className="text-teal-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">AI-Powered Search</h4>
              <p className="text-gray-600">
                Quickly find the right courses with our advanced AI
                recommendation engine.
              </p>
            </div>
            {/* Benefit 3 */}
            <div
              className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaChartLine className="text-teal-600 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Career Growth</h4>
              <p className="text-gray-600">
                Gain in-demand skills to accelerate your professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Academia. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-400">
              Facebook
            </a>
            <a href="#" className="hover:text-teal-400">
              Twitter
            </a>
            <a href="#" className="hover:text-teal-400">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
