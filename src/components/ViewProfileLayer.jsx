import React, { useState } from "react";
import { useMemory } from "../services/memoryServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postData } from "../services/axiosService";

const ViewProfileLayer = () => {
  const { getAllData } = useMemory();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: getAllData("ud")?.user_first_name,
    last_name: getAllData("ud")?.user_last_name,
    middle_name: getAllData("ud")?.userData?.user_middle_name,
    email: getAllData("ud")?.user_email,
    phone_number: getAllData("ud")?.user_phone_number,
    date_of_birth: getAllData("ud")?.user_dob,
    state_of_origin: getAllData("ud")?.user_state_of_origin,
    address: getAllData("ud")?.user_address,
    office_address: getAllData("ud")?.office_address,
    user_currency: getAllData("ud")?.user_currency,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postData("/update_user/", data);
      toast.success(response?.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to load data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await postData("/update_password/", passwordData);
      toast.success(response.message || "Password updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  const [imagePreview, setImagePreview] = useState(
    "assets/images/user-grid/user-grid-img13.png"
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle function for password field
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle function for confirm password field
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };
  return (
    <div className="row gy-4">
      <div className="col-lg-4">
        <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
          {/* <img
            src="assets/images/user-grid/user-grid-bg1.png"
            alt=""
            className="w-100 object-fit-cover"
          /> */}
          <div className="pb-24 ms-16 mb-24 me-16  mt--100">
            <div className="text-center border border-top-0 border-start-0 border-end-0">
              {/* <img
                src="assets/images/user-grid/user-grid-img14.png"
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              /> */}
              <h6 className="mb-0 mt-16">
                {getAllData("ud")?.user_first_name}{" "}
                {getAllData("ud")?.user_last_name}
              </h6>
              <span className="text-secondary-light mb-16">
                {getAllData("ud")?.user_email}
              </span>
            </div>
            <div className="mt-24">
              <h6 className="text-xl mb-16">Personal Info</h6>
              <ul>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    Full Name
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_first_name}{" "}
                    {getAllData("ud")?.user_last_name}
                    {""}
                    {getAllData("ud")?.userData?.user_middle_name}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Email
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_email}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Phone Number
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_phone_number}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Date of birth
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_dob}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    State of origin
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_state_of_origin}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    address
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_address}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Office address
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.office_address}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    user currency
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {getAllData("ud")?.user_currency}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24 active"
                  id="pills-edit-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-edit-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-edit-profile"
                  aria-selected="true"
                >
                  Edit Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24"
                  id="pills-change-passwork-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-change-passwork"
                  type="button"
                  role="tab"
                  aria-controls="pills-change-passwork"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  Change Password
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-edit-profile"
                role="tabpanel"
                aria-labelledby="pills-edit-profile-tab"
                tabIndex={0}
              >
                {/* Upload Image End */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="first_name" className="form-label">
                          First Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Enter First Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="last_name" className="form-label">
                          Last Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Enter Last Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="middle_name" className="form-label">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="middle_name"
                          name="middle_name"
                          value={formData.middle_name}
                          onChange={handleChange}
                          placeholder="Enter Middle Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="phone_number" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="date_of_birth" className="form-label">
                          Date of Birth{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date_of_birth"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="state_of_origin" className="form-label">
                          State of Origin
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="state_of_origin"
                          name="state_of_origin"
                          value={formData.state_of_origin}
                          onChange={handleChange}
                          placeholder="Enter State of Origin"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="address" className="form-label">
                          Home Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter Home Address"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="office_address" className="form-label">
                          Office Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="office_address"
                          name="office_address"
                          value={formData.office_address}
                          onChange={handleChange}
                          placeholder="Enter Office Address"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label htmlFor="user_currency" className="form-label">
                          User Currency
                        </label>
                        <select
                          className="form-control radius-8 form-select"
                          id="user_currency"
                          name="user_currency"
                          value={formData.user_currency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select Currency
                          </option>
                          <option value="NGN">NGN - Nigerian Naira</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="EUR">EUR - Euro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      disabled={loading}
                    >
                      {loading ? "Pleaswait..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="pills-change-passwork"
                role="tabpanel"
                aria-labelledby="pills-change-passwork-tab"
                tabIndex="0"
              >
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-20">
                    <label
                      htmlFor="your-password"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Old Password <span className="text-danger-600">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        id="old_password"
                        name="old_password"
                        value={passwordData.old_password}
                        onChange={handlePasswordChange}
                        placeholder="Enter Old Password"
                        required
                      />
                      <span
                        className={`toggle-password ${
                          passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                        } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="your-password"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      New Password <span className="text-danger-600">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        id="new_password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        placeholder="Enter New Password"
                        required
                      />
                      <span
                        className={`toggle-password ${
                          passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                        } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="confirm-password"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Confirm Password{" "}
                      <span className="text-danger-600">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordChange}
                        placeholder="Confirm Password"
                        required
                      />
                      <span
                        className={`toggle-password ${
                          confirmPasswordVisible
                            ? "ri-eye-off-line"
                            : "ri-eye-line"
                        } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                        onClick={toggleConfirmPasswordVisibility}
                      ></span>
                    </div>
                    <p className="text-red">
                      {" "}
                      {passwordData.new_password !==
                        passwordData.confirm_password && "Password mismatch"}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    disabled={
                      passwordData.new_password !==
                        passwordData.confirm_password || loading
                    }
                  >
                    {loading ? "Please wait..." : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileLayer;
