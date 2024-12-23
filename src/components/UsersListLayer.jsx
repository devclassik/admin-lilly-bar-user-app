import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../services/axiosService";
import { useMemory } from "../services/memoryServices";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const UsersListLayer = () => {
  const { setData, getAllData } = useMemory();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await postData("/list_all_users/", {});
        setData("clientData", response.all_user);
      } catch (err) {
        console.error("Failed to fetch client data:", err);
        toast.error("Failed to fetch client data, session expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [navigate]);

  // Filter data based on search
  const filteredData = getAllData("clientData").filter((user) => {
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";  
    const email = user.email || "";         
  
    return (
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form
            className="navbar-search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
        <Link
          to="/add-user"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add New User
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Join Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-10">
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input radius-4 border border-neutral-400"
                          type="checkbox"
                          name={`checkbox-${index}`}
                        />
                      </div>
                      {index + 1}
                    </div>
                  </td>
                  <td>{new Date(data.date_joined).toDateString()}</td>
                  <td>{data.first_name} {data.last_name || "N/A"}</td>
                  <td>{data.email || "N/A"}</td>
                  <td>{data.phone_number || "N/A"}</td>
                  <td>{data.user_home_address || "N/A"}</td>
                  <td className="text-center">
                    <span
                      className={`bg-${
                        data.is_active
                          ? "success-focus text-success-600 border-success-main"
                          : "danger-focus text-danger-600 border-danger-main"
                      } px-24 py-4 radius-4 fw-medium text-sm`}
                    >
                      {data.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      {/* Uncommented Actions */}
                      <button
                        type="button"
                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      >
                        <Icon icon="lucide:edit" className="menu-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <li className="page-item" key={i}>
                <button
                  className={`page-link ${
                    currentPage === i + 1
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-200"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersListLayer;
