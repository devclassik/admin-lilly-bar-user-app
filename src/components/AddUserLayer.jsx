import React, { useState } from "react";
import { postData } from "../services/axiosService";
import { toast } from "react-toastify";

const AddUserLayer = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    state_of_origin: "",
    address: "",
    office_address: "",
    user_currency: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postData("/register/", formData);

      toast.success("Proceed to verify account");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-8 col-lg-10">
            <div className="card border">
              <div className="card-body">
                {/* Upload Image Start */}

                {/* Upload Image End */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-20">
                    <label
                      htmlFor="first_name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      First Name <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="last_name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Last Name <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="last_name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="middle_name"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                      placeholder="Enter Middle Name"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Email <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="phone_number"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control radius-8"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="phone_number"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control radius-8"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      placeholder="Enter Date of Birth"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="state_of_origin"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      State of origin <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="state_of_origin"
                      name="state_of_origin"
                      value={formData.state_of_origin}
                      onChange={handleInputChange}
                      placeholder="Enter state of Origin"
                      required
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="state_of_origin"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Address <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="state_of_origin"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Office Address <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="office_address"
                      name="office_address"
                      value={formData.office_address}
                      onChange={handleInputChange}
                      placeholder="Enter Office address"
                    />
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
                    >
                      {loading ? "Please wait..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserLayer;
