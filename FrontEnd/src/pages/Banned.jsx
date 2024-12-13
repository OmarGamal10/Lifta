import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import useHttp from "../hooks/useHTTP";
import { useNavigate } from "react-router-dom";
const Banned = () => {
  const navigate = useNavigate();
  const { get, loading, err } = useHttp("http://localhost:3000");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await get("/users/logout");
      navigate("/log-in");
      console.log(response);
      // Redirect or update state if logout is successful
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-auto py-10">
        <img src="src/assets/ban.png" className=" w-[720px] h-auto" />
        <h1 className="text-3xl font-bold my-2 text-secondary">Oops!</h1>
        <h1 className="text-3xl font-bold text-secondary">
          You have been banned
        </h1>
        <button
          onClick={handleLogout}
          className="bg-primary rounded-full text-white text-xl font-semibold px-6 py-2 my-5"
        >
          Log out
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Banned;
