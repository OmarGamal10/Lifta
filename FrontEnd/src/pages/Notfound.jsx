import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const Notfound = (prefernece) => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-auto py-10">
        <img src="src/assets/404.png" className=" w-[720px] h-auto" />
        <h1 className="text-3xl font-bold my-2 text-secondary">Oops!</h1>
        <h1 className="text-3xl font-bold text-secondary">
          You seem a bit Lost
        </h1>
        <Link
          to="/"
          className="bg-primary rounded-full text-white text-xl font-semibold px-6 py-2 my-5"
        >
          Go to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Notfound;
