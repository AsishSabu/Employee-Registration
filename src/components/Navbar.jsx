import { useDispatch, useSelector } from "react-redux";
import { logo } from "../assets/index ";
import Avatar from "@mui/joy/Avatar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { logoutUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("User Logout Succesfully");
  };
  return (
    <>
      <nav className="bg-[#071952] px-6 py-2 flex justify-between items-center h-18">
        <div className=" font-bold ">
          <img src={logo} className="h-8 w-8 rounded-sm mx-2" />
          <h1 className="text-white font-bold px-2">Scita</h1>
        </div>

        <div className="relative">
        <button
          onClick={handleToggle}
          className="items-center focus:outline-none flex flex-col"
        >
          <Avatar />
          <span className="font-bold text-white ml-2">
            {currentUser?.name || "Guest"}
          </span>
        </button>
        {toggle && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {currentUser ? (
                <>
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setToggle(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </div>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      navigate("/login");
                      setToggle(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign In
                  </div>
                  <div
                    onClick={() => {
                      navigate("/signup");
                      setToggle(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign Up
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      </nav>
    </>
  );
};

export default Navbar;
