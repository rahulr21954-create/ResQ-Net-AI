import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountUp from 'react-countup'
import {
  FaHeartbeat,
  FaMapMarkerAlt,
  FaHospital,
  FaAmbulance,
  FaShieldAlt,
   FaPhoneAlt,
  FaRobot,
  FaBell,
  FaMapMarkedAlt,
  FaHandsHelping,
  FaBrain,
  FaMobileAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaStar,
  FaQuoteLeft,FaArrowRight
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              🚨 AI Powered Emergency Response
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold mt-8 leading-tight">

              Save Lives Faster

              <span className="text-red-500">
                {" "}with ResQ Net AI
              </span>

            </h1>

            <p className="text-gray-300 mt-8 text-lg leading-8">

              ResQ Net AI is an intelligent emergency response platform
              that connects citizens with hospitals, ambulances,
              police, and live tracking using Artificial Intelligence.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/sos"
                className="bg-red-600 hover:bg-red-700
                px-8 py-4 rounded-xl
                text-lg font-semibold
                transition"
              >
                🚨 Emergency SOS
              </Link>

              <Link
                to="/dashboard"
                className="border border-white
                hover:bg-white
                hover:text-black
                px-8 py-4 rounded-xl
                text-lg
                transition"
              >
                Explore Dashboard
              </Link>

            </div>

            {/* Features */}

            <div className="grid grid-cols-2 gap-5 mt-12">

              <div className="flex items-center gap-3">

                <FaHeartbeat className="text-red-500 text-3xl" />

                <div>

                  <h3 className="font-semibold">
                    Instant SOS
                  </h3>

                  <p className="text-sm text-gray-400">
                    One Tap Emergency
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-red-500 text-3xl" />

                <div>

                  <h3 className="font-semibold">
                    Live Tracking
                  </h3>

                  <p className="text-sm text-gray-400">
                    GPS Navigation
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaHospital className="text-red-500 text-3xl" />

                <div>

                  <h3 className="font-semibold">
                    Nearby Hospitals
                  </h3>

                  <p className="text-sm text-gray-400">
                    Fast Medical Support
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaAmbulance className="text-red-500 text-3xl" />

                <div>

                  <h3 className="font-semibold">
                    Ambulance Dispatch
                  </h3>

                  <p className="text-sm text-gray-400">
                    Quick Response
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="relative">

              <div
                className="
                w-96
                h-96
                rounded-full
                bg-red-600/20
                absolute
                blur-3xl
                animate-pulse
                "
              ></div>

              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=700"
                alt="Emergency"
                className="relative rounded-3xl shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>
      {/* Services Section */}

<section className="bg-gray-100 py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center">

      <h2 className="text-4xl font-bold text-slate-900">
        Our Emergency Services
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Get instant access to emergency assistance anytime, anywhere.
      </p>

    </div>

    {/* Cards */}

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {/* Hospital */}

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">

          <FaHospital className="text-4xl text-blue-600"/>

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Hospitals
        </h3>

        <p className="text-gray-600 mt-4">
          Find the nearest hospitals and emergency medical centers instantly.
        </p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Explore
        </button>

      </div>

      {/* Ambulance */}

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">

          <FaAmbulance className="text-4xl text-green-600"/>

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Ambulance
        </h3>

        <p className="text-gray-600 mt-4">
          Request an ambulance with one tap and share your live location.
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Request
        </button>

      </div>

      {/* Police */}

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">

          <FaShieldAlt className="text-4xl text-yellow-500"/>

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Police
        </h3>

        <p className="text-gray-600 mt-4">
          Contact nearby police stations for immediate law enforcement support.
        </p>

        <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
          Contact
        </button>

      </div>

      {/* Live Tracking */}

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">

          <FaMapMarkerAlt className="text-4xl text-red-600"/>

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Live Tracking
        </h3>

        <p className="text-gray-600 mt-4">
          Track ambulances, hospitals, and emergency responders in real time.
        </p>

        <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Track
        </button>

      </div>

    </div>

  </div>

</section>
{/* How It Works */}

<section className="bg-white py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center">

      <h2 className="text-4xl font-bold text-slate-900">
        How ResQ Net AI Works
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Get emergency assistance in just a few simple steps.
      </p>

    </div>

    {/* Timeline */}

    <div className="mt-20 grid md:grid-cols-5 gap-10">

      {/* Step 1 */}

      <div className="text-center">

        <div className="w-20 h-20 bg-red-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <FaPhoneAlt className="text-white text-4xl" />
        </div>

        <h3 className="text-xl font-bold mt-6">
          Emergency
        </h3>

        <p className="text-gray-600 mt-3">
          User presses the SOS button during an emergency.
        </p>

      </div>

      {/* Step 2 */}

      <div className="text-center">

        <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-4xl" />
        </div>

        <h3 className="text-xl font-bold mt-6">
          AI Analysis
        </h3>

        <p className="text-gray-600 mt-3">
          AI analyzes the location and emergency details instantly.
        </p>

      </div>

      {/* Step 3 */}

      <div className="text-center">

        <div className="w-20 h-20 bg-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <FaBell className="text-white text-4xl" />
        </div>

        <h3 className="text-xl font-bold mt-6">
          Notify Services
        </h3>

        <p className="text-gray-600 mt-3">
          Nearby hospitals, ambulances, and police receive alerts.
        </p>

      </div>

      {/* Step 4 */}

      <div className="text-center">

        <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <FaMapMarkedAlt className="text-white text-4xl" />
        </div>

        <h3 className="text-xl font-bold mt-6">
          Live Tracking
        </h3>

        <p className="text-gray-600 mt-3">
          Track responders and emergency status in real time.
        </p>

      </div>

      {/* Step 5 */}

      <div className="text-center">

        <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
          <FaHandsHelping className="text-white text-4xl" />
        </div>

        <h3 className="text-xl font-bold mt-6">
          Safe Rescue
        </h3>

        <p className="text-gray-600 mt-3">
          Emergency teams arrive quickly and ensure your safety.
        </p>

      </div>

    </div>

  </div>

</section>
{/* ================= Features Section ================= */}

<section className="bg-slate-900 text-white py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        Powerful Features
      </h2>

      <p className="text-gray-300 mt-4 text-lg">
        Smart technology designed to save lives during emergencies.
      </p>

    </div>

    {/* Feature Cards */}

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {/* Feature 1 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">

          <FaBrain className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          AI Emergency Detection
        </h3>

        <p className="text-gray-300 mt-4">
          AI instantly analyzes emergency situations and suggests the fastest response.
        </p>

      </div>

      {/* Feature 2 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">

          <FaMapMarkedAlt className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Live GPS Tracking
        </h3>

        <p className="text-gray-300 mt-4">
          Track ambulances, hospitals, and emergency responders in real time.
        </p>

      </div>

      {/* Feature 3 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">

          <FaAmbulance className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Fast Ambulance Dispatch
        </h3>

        <p className="text-gray-300 mt-4">
          Request an ambulance instantly with a single tap.
        </p>

      </div>

      {/* Feature 4 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">

          <FaHospital className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Nearby Hospitals
        </h3>

        <p className="text-gray-300 mt-4">
          Locate hospitals based on your current location with accurate navigation.
        </p>

      </div>

      {/* Feature 5 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">

          <FaBell className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Instant Notifications
        </h3>

        <p className="text-gray-300 mt-4">
          Send real-time alerts to hospitals, ambulances, and family members.
        </p>

      </div>

      {/* Feature 6 */}

      <div className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:-translate-y-2 transition duration-300 shadow-lg">

        <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center">

          <FaMobileAlt className="text-3xl text-white" />

        </div>

        <h3 className="text-2xl font-bold mt-6">
          Mobile Friendly
        </h3>

        <p className="text-gray-300 mt-4">
          Fully responsive design that works smoothly on phones, tablets, and desktops.
        </p>

      </div>

    </div>

  </div>

</section>
{/* ================= Statistics Section ================= */}

<section className="bg-gradient-to-r from-red-600 to-red-700 py-20">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center text-white">

      <h2 className="text-4xl font-bold">
        Our Impact
      </h2>

      <p className="mt-4 text-lg text-red-100">
        Every second matters. Here's how ResQ Net AI is making a difference.
      </p>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {/* Card 1 */}

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">

        <FaHeartbeat className="text-5xl text-red-600 mx-auto"/>

        <div className="text-center">
          
          <p>Lives Saved</p>
        </div>

        <p className="mt-3 text-lg font-semibold text-gray-700">
          Lives Saved
        </p>

      </div>

      {/* Card 2 */}

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">

        <FaHospital className="text-5xl text-blue-600 mx-auto"/>

        <h1 className="text-5xl font-bold text-brown-600 mt-5">
          300+
        </h1>

        <p className="mt-3 text-lg font-semibold text-gray-700">
          Hospitals Connected
        </p>

      </div>

      {/* Card 3 */}

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">

        <FaAmbulance className="text-5xl text-green-600 mx-auto"/>

        <h1 className="text-5xl font-bold text-brown-600 mt-5">
          150+
        </h1>

        <p className="mt-3 text-lg font-semibold text-gray-700">
          Ambulance
        </p>

      </div>

      {/* Card 4 */}

      <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">

        <FaPhoneAlt className="text-5xl text-purple-900 mx-auto"/>

        <h1 className="text-5xl font-bold text-brown-600 mt-5">
          24/7
        </h1>

        <p className="mt-3 text-lg font-semibold text-gray-700">
          Emergency Support
        </p>

      </div>

    </div>

  </div>

</section>

{/* ================= Testimonials ================= */}

<section className="py-20 bg-gray-100">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        What People Say
      </h2>

      <p className="text-gray-500 mt-4 text-lg">
        Trusted by citizens and emergency responders.
      </p>

    </div>

    {/* Testimonials */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

      {/* Testimonial 1 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

        <FaQuoteLeft className="text-4xl text-red-500"/>

        <p className="text-gray-600 mt-5 leading-7">
          ResQ Net AI helped me locate the nearest hospital
          within seconds during an emergency. It truly saved
          valuable time.
        </p>

        <div className="flex mt-5 text-yellow-400">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>

        <div className="mt-6 flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/100?img=11"
            alt="User"
            className="w-14 h-14 rounded-full"
          />

          <div>

            <h4 className="font-bold">
              Rahul Sharma
            </h4>

            <p className="text-gray-500 text-sm">
              Student
            </p>

          </div>

        </div>

      </div>

      {/* Testimonial 2 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

        <FaQuoteLeft className="text-4xl text-blue-500"/>

        <p className="text-gray-600 mt-5 leading-7">
          Live ambulance tracking is an amazing feature.
          The interface is simple and works perfectly.
        </p>

        <div className="flex mt-5 text-yellow-400">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>

        <div className="mt-6 flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/100?img=15"
            alt="User"
            className="w-14 h-14 rounded-full"
          />

          <div>

            <h4 className="font-bold">
              Priya Verma
            </h4>

            <p className="text-gray-500 text-sm">
              Healthcare Worker
            </p>

          </div>

        </div>

      </div>

      {/* Testimonial 3 */}

      <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

        <FaQuoteLeft className="text-4xl text-green-500"/>

        <p className="text-gray-600 mt-5 leading-7">
          The AI emergency detection is impressive.
          This platform has huge potential to improve
          emergency response.
        </p>

        <div className="flex mt-5 text-yellow-400">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>

        <div className="mt-6 flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/100?img=32"
            alt="User"
            className="w-14 h-14 rounded-full"
          />

          <div>

            <h4 className="font-bold">
              Dr. Ankit Singh
            </h4>

            <p className="text-gray-500 text-sm">
              Emergency Doctor
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= CTA Section ================= */}

<section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white">

  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 lg:p-16 text-center shadow-2xl">

      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">

        <FaHeartbeat className="text-5xl text-red-600 animate-pulse" />

      </div>

      <h2 className="text-4xl lg:text-5xl font-bold mt-8">
        Ready to Save Lives?
      </h2>

      <p className="mt-6 text-lg lg:text-xl text-red-100 max-w-3xl mx-auto leading-8">

        Join thousands of users using AI-powered emergency
        assistance. Register today and make emergency
        response faster, smarter, and safer.

      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">

        <Link
          to="/signup"
          className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition duration-300"
        >
          Get Started
        </Link>

        <Link
          to="/dashboard"
          className="border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition duration-300 flex items-center justify-center gap-3"
        >
          View Dashboard
          <FaArrowRight />
        </Link>

      </div>

    </div>

  </div>

</section>

{/* ================= Footer ================= */}

<footer className="bg-slate-950 text-white pt-16 pb-8">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Company */}

      <div>

        <div className="flex items-center gap-3">

          <div className="bg-red-600 p-3 rounded-full">
            <FaHeartbeat className="text-2xl"/>
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              ResQ
              <span className="text-red-500"> Net AI</span>
            </h2>

            <p className="text-gray-400 text-sm">
              Saving Lives with AI
            </p>

          </div>

        </div>

        <p className="text-gray-400 mt-6 leading-7">

          ResQ Net AI is an intelligent emergency response
          platform connecting citizens with hospitals,
          ambulances, police, and emergency services using AI.

        </p>

      </div>

      {/* Quick Links */}

      <div>

        <h3 className="text-xl font-bold mb-6">
          Quick Links
        </h3>

        <ul className="space-y-3">

          <li className="hover:text-red-500 cursor-pointer">
            Home
          </li>

          <li className="hover:text-red-500 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-red-500 cursor-pointer">
            Hospitals
          </li>

          <li className="hover:text-red-500 cursor-pointer">
            Live Tracking
          </li>

          <li className="hover:text-red-500 cursor-pointer">
            Emergency SOS
          </li>

        </ul>

      </div>

      {/* Contact */}

      <div>

        <h3 className="text-xl font-bold mb-6">
          Contact
        </h3>

        <div className="space-y-5">

          <div className="flex gap-3">

            <FaPhoneAlt className="text-red-500 mt-1"/>

            <span>+91 98765 43210</span>

          </div>

          <div className="flex gap-3">

            <FaEnvelope className="text-red-500 mt-1"/>

            <span>support@resqnetai.com</span>

          </div>

          <div className="flex gap-3">

            <FaMapMarkerAlt className="text-red-500 mt-1"/>

            <span>Greater Noida, India</span>

          </div>

        </div>

      </div>

      {/* Social */}

      <div>

        <h3 className="text-xl font-bold mb-6">
          Follow Us
        </h3>

        <div className="flex gap-5">

          <a
            href="#"
            className="bg-slate-800 p-4 rounded-full hover:bg-red-600 transition"
          >
            <FaFacebook/>
          </a>

          <a
            href="#"
            className="bg-slate-800 p-4 rounded-full hover:bg-red-600 transition"
          >
            <FaInstagram/>
          </a>

          <a
            href="#"
            className="bg-slate-800 p-4 rounded-full hover:bg-red-600 transition"
          >
            <FaLinkedin/>
          </a>

          <a
            href="#"
            className="bg-slate-800 p-4 rounded-full hover:bg-red-600 transition"
          >
            <FaGithub/>
          </a>

        </div>

      </div>

    </div>

    {/* Divider */}

    <div className="border-t border-slate-800 mt-12 pt-6">

      <div className="flex flex-col md:flex-row justify-between items-center">

        <p className="text-gray-400 text-center">

          © 2026 ResQ Net AI. All Rights Reserved.

        </p>

        <div className="flex gap-6 mt-4 md:mt-0">

          <span className="hover:text-red-500 cursor-pointer">
            Privacy Policy
          </span>

          <span className="hover:text-red-500 cursor-pointer">
            Terms
          </span>

          <span className="hover:text-red-500 cursor-pointer">
            Support
          </span>

        </div>

      </div>

    </div>

  </div>

</footer>
    </>
  );
}

export default Home;

