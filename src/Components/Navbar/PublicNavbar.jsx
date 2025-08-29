import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo1 from "/src/images/logo1.jpg";

export default function PublicNavbar() {
  return (
    <Disclosure
      as="nav"
      className="relative bg-yellow-500 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left section: Logo + Brand */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <div className="-ml-2 mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-yellow-900 hover:bg-yellow-400/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-700 transition-transform duration-300 hover:scale-105">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <img
                  src={logo1}
                  alt="Logo"
                  className="h-10 w-10 rounded-full border-2 border-yellow-700 shadow-md"
                />

                {/* Brand Name */}
                <div className="hidden md:flex md:ml-4 items-center">
                  <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wide text-yellow-900 drop-shadow-md transition-transform duration-300 hover:text-white hover:scale-105"
                  >
                    BudgetBee
                  </Link>
                </div>
              </div>

              {/* Right section: Buttons */}
              <div className="flex space-x-3">
                {/* Register Button */}
                <Link
                  to="/register"
                  className="inline-flex items-center gap-x-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black shadow-md transition-transform duration-300 hover:scale-105 hover:bg-yellow-500"
                >
                  <FaRegUser className="h-5 w-5" />
                  Register
                </Link>

                {/* Login Button */}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-x-2 rounded-full bg-[#5C3A21] px-5 py-2 text-sm font-bold text-yellow-200 shadow-md transition-transform duration-300 hover:scale-105 hover:bg-[#6B452B]"
                >
                  <RiLoginCircleLine className="h-5 w-5" />
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden bg-yellow-200 text-yellow-900 transition-all duration-500 ease-in-out">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-yellow-300 hover:text-yellow-900 transition duration-200">
                  BudgetBee
                </Disclosure.Button>
              </Link>
              <Link to="/register">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-yellow-300 hover:text-yellow-900 transition duration-200">
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button className="block w-full text-left py-2 pl-3 pr-4 rounded-md font-medium hover:bg-yellow-300 hover:text-yellow-900 transition duration-200">
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}