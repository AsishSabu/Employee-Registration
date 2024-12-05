import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-hot-toast";
import { checkData } from "../utils/validation.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, clearErrors, setErrors } from "../redux/userSlice.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "female",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
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
      setFormErrors({})
      toast.success("User Registered Successfully");
      dispatch(addUser(formData));
      dispatch(clearErrors())
      navigate("/login");
    } else {
      toast.error("Form data contain errors");
      setFormErrors(valid);
      dispatch(setErrors(valid))
    }
  };
  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="  sm:mx-auto sm:w-full sm:max-w-md  ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="bg-white mt-8  sm:mx-auto sm:w-full sm:max-w-md  rounded-lg ">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex flex-col mx-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            {formErrors.name && (
              <span className="text-red-600 text-sm">{formErrors.name}</span>
            )}
          </div>

          <div className="flex flex-col mx-4 mt-2 gap-1">
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              fullWidth
            />
            <span className="text-red-600 text-sm">{formErrors.age}</span>
          </div>

          <div className="flex flex-col mt-3 mx-4 gap-4">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <span className="text-red-600 text-sm">{formErrors.gender}</span>
          </div>
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
          <div className="flex flex-col mx-4 mt-4">
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Tester">Tester</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
            <span className="text-red-600 text-sm">{formErrors.role}</span>
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
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <span className="text-red-600 text-sm">
              {formErrors.confirmPassword}
            </span>
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Signup
            </Button>
          </div>
          <div className="items-center flex justify-center pt-2">
            <h2 className="font-medium">
              Already Registered ?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-900"
              >
                {" "}
                Sign In
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
