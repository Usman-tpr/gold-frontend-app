import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RiDashboardFill } from "react-icons/ri";
import { IoSettingsOutline, IoPersonAdd } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdExpandLess } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FaIdeal } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const UserDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

 const handleSignout = () =>{
  localStorage.removeItem("Gold_token")
 }
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };


  return (
    <>
      <div className="relative flex h-screen bg-gray-100 max-w-[1920px] 3xl:mx-auto">
        {/* Sidebar start here */}
        <div
          className={`fixed inset-y-0 left-0 3xl:left-auto bg-white border-r transition-all duration-300 z-20 ${
            isSidebarOpen ? "w-56" : "w-24"
          } flex flex-col justify-between`}
        >
          {/* Sidebar Toggle Button */}
          <div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mt-20 mx-6  text-black"
            >
              {isSidebarOpen ? (
                <RiCloseLargeLine size={30} /> // Cross icon when open
              ) : (
                <CiMenuFries size={30} /> // Menu icon when closed
              )}
            </button>

            {/* Main Navigation Items */}
            <div className="mt-10 flex-grow">
          
              <NavLink
                to="/user-dashboard/manage-product"
                className={({ isActive }) =>
                  `flex items-center p-4 cursor-pointer whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "bg-blue-950 text-white"
                      : "text-black hover:bg-blue-950 hover:text-white"
                  }`
                }
              >
              <SidebarItem
                  icon={<RiDashboardFill size={30} />}
                  title="Dashboard"
                  isOpen={isSidebarOpen}
                />
              </NavLink>
              <NavLink
                to="/user-dashboard/manage-deals"
                className={({ isActive }) =>
                  `flex items-center p-4 cursor-pointer whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "bg-blue-950 text-white"
                      : "text-black hover:bg-blue-950 hover:text-white"
                  }`
                }
              >
                <SidebarItem
                  icon={<FaIdeal size={30} />}
                  title="Deals"
                  isOpen={isSidebarOpen}
                />
              </NavLink>
              <NavLink
                to="/user-dashboard/manage-cart"
                className={({ isActive }) =>
                  `flex items-center p-4 cursor-pointer whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "bg-blue-950 text-white"
                      : "text-black hover:bg-blue-950 hover:text-white"
                  }`
                }
              >
                <SidebarItem
                  icon={<IoCartOutline size={30} />}
                  title="Carts"
                  isOpen={isSidebarOpen}
                />
              </NavLink>
            </div>
          </div>

          {/* Settings Navigation Item at the Bottom */}
          <div className="mb-4">
            <NavLink
              to="/admin-dashboard/settings"
              className={({ isActive }) =>
                `flex items-center p-4 cursor-pointer whitespace-nowrap overflow-hidden ${
                  isActive
                    ? "bg-blue-950 text-white"
                    : "text-black hover:bg-blue-950 hover:text-blue-950"
                }`
              }
            >
              <SidebarItem
                icon={<IoSettingsOutline size={30} />}
                title="Setting"
                isOpen={isSidebarOpen}
              />
            </NavLink>
          </div>
        </div>

        {/* Sidebar end here */}

        {/* Main content area start here */}
        <div className="flex-1 flex flex-col justify-between ml-16">
          {/* Header */}
          <header className="bg-white p-2 shadow-md sm:px-10 sm:py-3">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">User Dashboard</h1>
              </div>
              <div className="flex items-center">
                {/* <div className="">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost rounded-btn"
                      onClick={toggleDropdown}
                    >
                      <img
                        className="bg-[#F7F7F7] p-2 rounded-full"
                        src="/assets/icons/notification.svg"
                        alt="Notifications"
                      />
                    </div>
                    {isOpen && (
                      <ul
                        className="menu dropdown-content bg-white rounded-box z-[1] mt-4 w-52 p-1 shadow absolute"
                        onClick={closeDropdown}
                      >
                        <li>
                          <span>netchain joins today</span>
                        </li>
                        <li>
                          <span>netchain generate on contract</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div> */}

                {/* User Dropdown */}
                {/* <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleUserDropdown}
                  >
                    <span className="hidden sm:block">
                      {localStorage.getItem("fullName") &&
                      localStorage.getItem("fullName") !== "undefined undefined"
                        ? localStorage.getItem("fullName")
                        : "Hello User"}
                    </span>{" "}
                    <img
                      className="w-8 h-8 rounded-full border border-usetheme"
                      src={
                        localStorage.getItem("picture") &&
                        localStorage.getItem("picture") !== "undefined" &&
                        localStorage.getItem("picture") !== null
                          ? localStorage.getItem("picture")
                          : "/assets/icons/avatar-icon-2.svg"
                      }
                      alt="User Avatar"
                    />
                    <MdExpandLess
                      className={`transition-transform ${
                        isUserDropdownOpen ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </div>
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                      <ul className="py-2">
                        <Link to="/admin-dashboard/profile-setting">
                          <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b-2">
                            <GoPerson className="w-5 h-5 mr-2" />
                            <span>Profile Setting</span>
                          </li>
                        </Link>
                        <Link to="/">
                          <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer ">
                            <MdOutlinePowerSettingsNew className="w-5 h-5 mr-2" />
                            <span onClick={handleSignout}>Sign Out</span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </header>

          {/* here the children will come and the sidebar and header will be the same */}
          <main className="px-4 py-1 overflow-y-auto h-[100vh]">
            {children}
          </main>
          <footer className="footer footer-center bg-zinc-200 text-base-content p-1 sm:p-2 font-semibold text-[10px] sm:text-sm xl:text-base">
            <aside>
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                <span className="font-bold">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://netchainmedia.com/"
                  >
                    {" "}
                    NetChain Media
                  </a>
                </span>
              </p>
            </aside>
          </footer>
        </div>
        {/* Main content area end here */}
      </div>
    </>
  );
};

const SidebarItem = ({ icon, title, isOpen }) => {
  return (
    <>
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="ml-4">{title}</span>}
    </>
  );
};

export default UserDashboardLayout;
