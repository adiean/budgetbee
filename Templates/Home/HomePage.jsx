import React from "react";
import { FaChartPie, FaList, FaMoneyBillWave, FaQuoteLeft, FaSignInAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-yellow-50 min-h-screen">
      {/* Honeycomb background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-honeycomb z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-center mb-4">
            Track Your Expenses Effortlessly
          </h1>
          <p className="text-xl text-center mb-10">
            Manage your finances with a modern solution designed for you.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-3xl shadow-lg">
              <FaMoneyBillWave className="text-3xl text-yellow-700" />
              <p className="mt-2 font-medium">Efficient Tracking</p>
            </div>
            <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-3xl shadow-lg">
              <FaFilter className="text-3xl text-yellow-700" />
              <p className="mt-2 font-medium">Transactions Filtering</p>
            </div>
            <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-3xl shadow-lg">
              <IoIosStats className="text-3xl text-yellow-700" />
              <p className="mt-2 font-medium">Insightful Reports</p>
            </div>
          </div>

          <Link to="/register">
            <button className="px-6 py-3 bg-yellow-700 text-white font-bold rounded-2xl shadow-lg hover:bg-yellow-800 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-yellow-900 mb-12">
          How It Works
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-yellow-50 p-6 rounded-3xl shadow-lg">
            <div className="p-4 rounded-full bg-yellow-200 text-yellow-900 mb-4">
              <FaSignInAlt className="text-xl" />
            </div>
            <h3 className="mb-2 font-bold">Sign Up</h3>
            <p>Register and start managing your expenses in a minute.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-yellow-50 p-6 rounded-3xl shadow-lg">
            <div className="p-4 rounded-full bg-yellow-200 text-yellow-900 mb-4">
              <FaList className="text-xl" />
            </div>
            <h3 className="mb-2 font-bold">Add Transactions</h3>
            <p>Quickly add income and expenses to your account.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-yellow-50 p-6 rounded-3xl shadow-lg">
            <div className="p-4 rounded-full bg-yellow-200 text-yellow-900 mb-4">
              <FaChartPie className="text-xl" />
            </div>
            <h3 className="mb-2 font-bold">View Reports</h3>
            <p>See insightful reports & graphs of your finances.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 bg-yellow-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-yellow-900 mb-12">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-50 p-6 rounded-3xl shadow-lg">
            <FaQuoteLeft className="text-xl text-yellow-400" />
            <p className="mt-4 italic">
              "This app has revolutionized the way I track my expenses. Highly intuitive and user-friendly."
            </p>
            <p className="mt-4 font-bold text-yellow-900">- Jane Doe</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-3xl shadow-lg">
            <FaQuoteLeft className="text-xl text-yellow-400" />
            <p className="mt-4 italic">
              "Finally, a hassle-free way to manage my finances. The insights feature is a game changer!"
            </p>
            <p className="mt-4 font-bold text-yellow-900">- John Smith</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 bg-yellow-700 text-yellow-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
        <p className="mb-8">Join us now and start managing your expenses like a pro!</p>
        <Link to="/register">
          <button className="px-6 py-3 bg-yellow-50 text-yellow-700 font-bold rounded-2xl shadow-lg hover:bg-yellow-100 transition duration-300">
            Sign Up For Free
          </button>
        </Link>
      </section>

      <style>{`
        @keyframes honeycomb-move {
          0% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
          100% { background-position: 0 0; }
        }
        .animate-honeycomb {
          animation: honeycomb-move 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
