import "./output.css"; // Adjust the path as needed
import { Link } from "react-router-dom";

export function PageNotFound() {

  return (
    <div className="flex flex-col items-center justify-center text-textColor h-[100vh]">
          <h1 className="text-4xl font-medium flex flex-col md:text-5xl text-accent mb-4">
              Oops! Page Not Found
          </h1>
          <p className="mb-12">The page you are looking for is not found, we looked everywhere!</p>
          <Link
              to="log-in"
              className="w-48 h-12 p-4 flex justify-center items-center rounded-full bg-primary text-backGroundColor hover:font-medium mb-16"
            >
              Back to home
          </Link>
          <img src="src/assets/pageNotFound.svg" alt="page not found" className="object-cover w-[360px] h-[360px]"/>
    </div>
  );
}
