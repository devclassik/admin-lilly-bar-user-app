import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { useMemory } from "../services/memoryServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../services/axiosService";

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const { token, refreshToken, setData, loading, logout, getAllData } =
    useMemory();

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;

      // if (!token) {
      //   toast.error("No authentication token found.");
      //   navigate("/sign-in");
      //   return;
      // }

      try {
        const response = await postData("/user_details/", {});
        if (response.user_data.is_email_verify === false) {
          toast.error("Email not verified");
          navigate("/otp");
          return;
        }

        setData("ud", response.user_data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          logout();

          navigate("/sign-in");
        } else {
          toast.error("Failed to load data. Please try again.");
          navigate("/sign-in");
        }
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [token, refreshToken, navigate, setData, loading]);

  useEffect(() => {
    // Function to handle dropdown clicks
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    // Function to open submenu based on current route
    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
          }
        });
      });
    };

    // Open the submenu that contains the open route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link to="/" className="sidebar-logo">
            {/* <img
              src="assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            /> */}
            <h3> Admin</h3>
          </Link>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
          <li>
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                />
                <span>Dashboard</span>
              </NavLink>
            </li>


            {/* Users Dropdown */}
            <li className="dropdown">
              <Link to="#">
                <Icon
                  icon="flowbite:users-group-outline"
                  className="menu-icon"
                />
                <span>Clients</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/users-list"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Users List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-user"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                    Add User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/view-profile"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                    View Profile
                  </NavLink>
                </li>
              </ul>
            </li>


            {/* <li>
              <NavLink
                to="/gallery"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="solar:gallery-wide-linear" className="menu-icon" />
                <span>Gallery</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="hugeicons:money-send-square"
                  className="menu-icon"
                />
                <span>Pricing</span>
              </NavLink>
            </li> */}

          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className="navbar-header">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-4">
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon="iconoir:arrow-right"
                      className="icon text-2xl non-active"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:bars-3-solid"
                      className="icon text-2xl non-active "
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type="button"
                  className="sidebar-mobile-toggle"
                >
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>

              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                {/* ThemeToggleButton */}
                <ThemeToggleButton />

                {/* Notification dropdown end */}
                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src="assets/images/user.png"
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-2">
                          {getAllData("ud")?.user_first_name}{" "}
                          {getAllData("ud")?.user_last_name}
                        </h6>
                        <span className="text-secondary-light fw-medium text-sm">
                          Admin
                        </span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon
                          icon="radix-icons:cross-1"
                          className="icon text-xl"
                        />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to="/view-profile"
                        >
                          <Icon
                            icon="solar:user-linear"
                            className="icon text-xl"
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                          to="#"
                        >
                          <Icon icon="lucide:power" className="icon text-xl" />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className="dashboard-main-body">{children}</div>

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">
                © {currentYear} victor chamber. All Rights Reserved.
              </p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Made by{" "}
                <span className="text-primary-600">lilly solution ltd</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
