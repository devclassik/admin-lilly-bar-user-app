import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../services/axiosService";
import { useMemory } from "../services/memoryServices";

const SignInLayer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setData, login } = useMemory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await postData("/login/", { email, password });      

      if (response.access_data) {
        toast.success("Login successful");
        const { access, refresh } = response.access_data ;

        setData("up", { email, password });
        login(access, refresh); 

        setData("ar", { access, refresh });
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/logoTwo.png" alt="Logo" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img
                src="assets/images/auth/logoTwo.png"
                alt="Logo"
                style={{ height: "50px", borderRadius: "12px" }}
              />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! Please enter your details.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="position-absolute end-0 top-50 translate-middle-y me-16 bg-transparent border-0 cursor-pointer"
                >
                  <Icon
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    className="text-secondary-light"
                  />
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="form-check style-check d-flex align-items-center">
                <input
                  className="form-check-input border border-neutral-300"
                  type="checkbox"
                  defaultValue=""
                  id="remeber"
                />
                <label className="form-check-label" htmlFor="remeber">
                  Remember me{" "}
                </label>
              </div>
              {/* <Link
                to="/forgot-password"
                className="text-primary-600 fw-medium"
              >
                Forgot Password?
              </Link> */}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-32"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {/* <div className="mt-32 text-center">
            <p>
              Don’t have an account?{" "}
              <Link to="/sign-up" className="text-primary-600 fw-semibold">
                Sign Up
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
