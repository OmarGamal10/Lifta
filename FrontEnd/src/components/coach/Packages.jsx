import React, { useState, useEffect } from "react";
import { PackageCard } from "../packageCard";
import ErrorMessage from "../errorMsg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PackageForm from "./packageForm";
import getTokenFromCookies from "../../freqUsedFuncs/getToken";
import Nodata from "../Nodata";
import { IoIosAddCircleOutline } from "react-icons/io";
import ExerciseForm from "./exerciseForm";
import useHttp from "../../hooks/useHTTP";
import NoDataDashboard from "../Nodata";
import { use } from "react";
import Loader from "../Loader"; // Import your Loader component

function Packages({ userId }) {
  const { get, patch, post, del, error, data } = useHttp(
    "http://localhost:3000"
  );
  const [curPage, setCurPage] = useState(1);
  const [packages, setPackages] = useState([]);
  const totalPages = Math.ceil(packages.length / 5);
  const [addPackageView, setAddPackageView] = useState(false);
  const [editPackageView, setEditPackageView] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  /////////////////////////////////////////
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await get(`/users/${userId}/packages`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response: ", response);

        const fetchedPackages = Array.isArray(response.data.packages)
          ? response.data.packages
          : [];
        setPackages(fetchedPackages);

        if (fetchedPackages.length === 0) {
          setCurPage(1);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setPackages([]);
      } finally {
        setLoading(false); // Hide loader after API call finishes
      }
    };

    fetchPackages();
  }, []);
  /////////////////////////////////////////
  const handleDelete = async (id) => {
    try {
      const response = await del(
        "/packages",
        {
          package_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setPackages((prev) => prev.filter((pkg) => pkg.package_id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggleActive = async (id) => {
    try {
      const response = await patch(
        `/packages/${id}/activate`,
        {
          is_active: !packages.find((pkg) => pkg.package_id === id).is_active,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setPackages((prev) =>
        prev.map((pkg) => {
          if (pkg.package_id === id) {
            return { ...pkg, is_active: !pkg.is_active };
          }
          return pkg;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handlePreviousPage = () => {
    setCurPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const renderPackages = () => (
    <>
      {editPackageView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PackageForm
            setView={setEditPackageView}
            edit={true}
            idToEdit={idToEdit}
            setPackages={setPackages}
          />
        </div>
      )}
      {addPackageView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PackageForm
            setPackages={setPackages}
            setView={setAddPackageView}
            userId={userId}
          />
        </div>
      )}
      <div
        className={`w-full flex flex-col min-h-screen justify-center px-12 py-3 ${
          addPackageView || editPackageView ? "opacity-50" : ""
        } `}
      >
        <h2 className="py-8 text-3xl self-start lg:text-4xl font-bold text-textColor">
          Packages
        </h2>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pr-10">
          {packages.slice((curPage - 1) * 5, curPage * 5).map((_package) => (
            <div key={_package.package_id} className="cursor-pointer">
              <PackageCard
                package_id={_package.package_id}
                name={_package.name}
                price={_package.price}
                type={_package.type}
                duration={_package.duration}
                description={_package.description}
                isActive={_package.is_active}
                setIdToEdit={setIdToEdit}
                setEditView={setEditPackageView}
                handleDelete={handleDelete}
                handleToggleActive={handleToggleActive}
                view={0}
              />
            </div>
          ))}
          <div className="flex items-center justify-center min-w-64 max-w-64 min-h-64 h-[280px]">
            <button
              onClick={() => setAddPackageView(true)}
              className="text-primary hover:text-secondary transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg transform"
            >
              <IoIosAddCircleOutline size={100} />
            </button>
          </div>
        </div>

        {packages.length > 0 && (
          <div className="flex justify-center items-center py-2 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={curPage === 1}
              className={`px-4 py-2 rounded-xl border ${
                curPage === 1
                  ? "text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-textColor">
              Page {curPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={curPage === totalPages}
              className={`px-8 py-2 rounded-xl border ${
                curPage === totalPages
                  ? "text-textColor cursor-not-allowed"
                  : "bg-secondary text-textColor hover:bg-textColor hover:text-secondary hover:border-secondary"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full">{loading ? <Loader /> : renderPackages()}</div>
  );
}
export default Packages;
