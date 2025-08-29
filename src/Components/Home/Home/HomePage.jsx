import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const features = [
    {
      title: "Track with Ease",
      description:
        "Manage your expenses without the buzz of confusion. Simple, clear, and effective.",
      icon: "🐝",
    },
    {
      title: "Smart Insights",
      description:
        "Get honey-sweet analytics to help your savings grow faster than ever.",
      icon: "📊",
    },
    {
      title: "Budget Goals",
      description:
        "Set clear targets and stay motivated as you work towards your financial hive dreams.",
      icon: "🎯",
    },
    {
      title: "Organized Categories",
      description:
        "Keep your spending sorted neatly so you always know where your honey goes.",
      icon: "🗂",
    },
  ];

  return (
    <>
      {/* Floating animation styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .float-animation {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden bg-yellow-100 text-black">
        {/* Honeycomb pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start">
          {/* Left Content */}
          <div className="flex-1 text-left">
            {/* Heading */}
            <h1 className="text-6xl font-extrabold text-yellow-900 drop-shadow-lg">
              Buzz into Smarter <br /> Expense Tracking🐝
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-xl text-yellow-800 font-medium">
              Sweeten your savings with{" "}
              <span className="font-extrabold">BudgetBee</span>
            </p>

            {/* Feature Icons */}
            <div className="flex space-x-8 mt-10 animate-fadeInUp delay-400">
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <FaMoneyBillWave className="text-4xl text-yellow-700 animate-bounce" 
                style={{ animationDelay: "0s" }}
              />
                <p className="mt-2 text-yellow-800">Seamless Tracking</p>
              </div>
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <FaFilter className="text-4xl text-yellow-700 animate-bounce" 
                style={{ animationDelay: "0.2s" }}
              />
                <p className="mt-2 text-yellow-800">Quick Entry</p>
              </div>
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <IoIosStats className="text-4xl text-yellow-700 animate-bounce" 
                style={{ animationDelay: "0.4s" }}
              />
                <p className="mt-2 text-yellow-800">Smart Insights</p>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="mt-8">
              <Link to="/register">
                <button className="px-10 py-4 bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition transform hover:-translate-y-1">
                  Join the Hive 🐝
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image with floating animation */}
          <div className="flex-1 mt-10 lg:mt-0 lg:ml-12 flex justify-center lg:items-center">
            <img
              src="peopleimage.png"
              alt="BudgetBee Illustration"
              className="w-full max-w-md drop-shadow-lg mt-6 float-animation"
            />
          </div>
        </div>
      </div>

      {/* Why BudgetBee Section */}
      <section className="relative bg-[#FFF9E6] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-yellow-900">
            Why <span className="text-yellow-700">BudgetBee</span>?
          </h2>
          <p className="mt-3 text-lg text-yellow-800">
            Smart, simple, and sweet like honey — here’s why you’ll love it. 🐝
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-yellow-50 border-2 border-yellow-300 p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex justify-center items-center text-5xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-yellow-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-yellow-800 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-yellow-600 text-[#42290f] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold drop-shadow-md">
            Take Charge of your <span className="text-yellow-200">Money</span> 🐝
          </h2>
          <p className="mt-4">
            Join Us Now – Bee Smart, Save Sweet, Spend Wise!
          </p>
          <Link to="/register">
            <button className="mt-8 px-10 py-4 bg-yellow-100 text-[#42290f] font-bold rounded-full shadow-lg hover:bg-yellow-200 hover:text-yellow-900 transition transform hover:-translate-y-1">
              Get Started Free! 🐝
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
