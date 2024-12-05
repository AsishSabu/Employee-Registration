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
    dispatch(logoutUser())
    toast.success("User Logout Succesfully")
  };
  return (
    <>
      <nav className="bg-[#071952] px-6 py-2 flex justify-between items-center h-18">
        <div className=" font-bold ">
          <img src={logo} className="h-8 w-8 rounded-sm mx-2" />
          <h1 className="text-white font-bold px-2">Scita</h1>
        </div>

        <Dropdown show={toggle} onClick={handleToggle}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic "
            onClick={(toggle) => !toggle}
          >
            <div className="flex flex-col">
              <Avatar />
              <span className="font-bold text-white">
                {currentUser && currentUser.name}
              </span>
            </div>
          </Dropdown.Toggle>
          {toggle && (
            <Dropdown.Menu className="flex flex-col  bg-gray-100 pt-6 pb-3 mt-1 px-2 rounded-md">
              {currentUser ? (
                <>
                  {" "}
                  <Dropdown.Item
                    onClick={() => navigate("/profile")}
                    className="border border-b-black px-3 rounded-m"
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className=" px-3 rounded-md"
                  >
                    Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item
                    onClick={() => navigate("/login")}
                    className="border border-b-black px-3 rounded-m"
                  >
                    SignIn
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/signup")}
                    className="px-3 rounded-md"
                  >
                    SignUp
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          )}
        </Dropdown>
      </nav>
    </>
  );
};

export default Navbar;
