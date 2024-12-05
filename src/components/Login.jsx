import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import { checkData } from "../utils/validation.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  clearErrors,
  setCurrent,
  setErrors,
} from "../redux/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  console.log(users);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const valid = await checkData(formData);
    console.log(valid);

    if (valid === true) {
      setErrors({})
      const user = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (user) {
        toast.success("User Logined Sucesfully");
        dispatch(setCurrent(user));
      } else {
        toast.error("Invlaid Credentials");
      }
    } else {
      setFormErrors(valid);
    }
  };
  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-screen ">
      <div className="  sm:mx-auto sm:w-full sm:max-w-md  ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="bg-white mt-8  sm:mx-auto sm:w-full sm:max-w-md  rounded-lg ">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col mx-4 mt-2 gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <span className="text-red-600 text-sm">{formErrors.email}</span>
          </div>
          <div className="flex flex-col mx-4 mt-2 gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
                 <span className="text-red-600 text-sm">{formErrors.password}</span>
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              SignIn
            </Button>
          </div>
          <div className="items-center flex justify-center pt-2">
            <h2 className="font-medium">
              are u a new User ?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-900"
              >
                {" "}
                Sign Up
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
