import React from "react";
import { Icon } from "@iconify/react";
import { useMemory } from "../../services/memoryServices";
import { formatCurrency, formatNumber } from "../../utils/utility";
const UnitCountOne = () => {
  const { getAllData, getAllUsers } = useMemory();
  getAllUsers();

  return (
    <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-1 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">Total Users</p>
                <h6 className="mb-0">{formatNumber(getAllData('clientData')?.length) || 0}</h6>
              </div>
              <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                <Icon
                  icon="gridicons:multiple-users"
                  className="text-white text-2xl mb-0"
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <Icon icon="bxs:up-arrow" className="text-xs" /> {formatNumber(getAllData('clientData')?.length || 0)}
              </span>
              Last 30 days users
            </p>
          </div>
        </div>
        {/* card end */}
      </div>

      <div className="col">
        <div className="card shadow-none border bg-gradient-start-4 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">
                  Total Income
                </p>
                <h6 className="mb-0">
                  {" "}
                  {formatCurrency(getAllData("ud")?.user_account_balance)}
                </h6>
              </div>
              <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                <Icon
                  icon="solar:wallet-bold"
                  className="text-white text-2xl mb-0"
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <Icon icon="bxs:up-arrow" className="text-xs" />{" "}
                {formatCurrency(20000)}
              </span>
              Last 30 days income
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
      <div className="col">
        <div className="card shadow-none border bg-gradient-start-5 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">
                  Total Expense
                </p>
                <h6 className="mb-0">&#8358; 30,000</h6>
              </div>
              <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                <Icon
                  icon="fa6-solid:file-invoice-dollar"
                  className="text-white text-2xl mb-0"
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <Icon icon="bxs:up-arrow" className="text-xs" />{" "}
                {formatCurrency(50)}
              </span>
              Last 30 days expense
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
    </div>
  );
};

export default UnitCountOne;
