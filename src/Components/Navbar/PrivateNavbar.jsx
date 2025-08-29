import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/slice/authSlice";
import logo1 from "/src/images/logo1.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  const navItems = [
    { name: "Add Transaction", href: "/add-transaction" },
    { name: "Add Category", href: "/add-category" },
    { name: "Categories", href: "/categories" },
    { name: "Profile", href: "/profile" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <Disclosure as="nav" className="bg-yellow-50 shadow-md border-b border-yellow-200">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <img
                    src={logo1}
                    alt="Logo"
                    className="h-10 w-10 rounded-full border-2 border-yellow-400 shadow-md"
                  />
                  <span className="text-xl font-extrabold text-yellow-900 drop-shadow-md">
                    BudgetBee
                  </span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex md:space-x-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 rounded-full text-sm font-medium text-yellow-800 shadow-md transition-transform duration-300 hover:scale-105 hover:text-yellow-900 hover:bg-yellow-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Logout and Profile */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={logoutHandler}
                  className="inline-flex items-center gap-1 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-red-600"
                >
                  <IoLogOutOutline className="h-5 w-5" />
                  Logout
                </button>

                {/* Profile Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(
                              active ? "bg-yellow-100" : "",
                              "block px-4 py-2 text-sm text-yellow-900"
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active ? "bg-yellow-100" : "",
                              "block px-4 py-2 text-sm text-yellow-900 w-full text-left"
                            )}
                          >
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-yellow-800 hover:bg-yellow-100 hover:text-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-transform duration-300 hover:scale-105">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden bg-yellow-50 border-t border-yellow-200">
            <div className="space-y-1 py-2">
              {navItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block px-4 py-2 text-yellow-900 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-yellow-100"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="button"
                onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-red-600 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-red-100"
              >
                Sign Out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
