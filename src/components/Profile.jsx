import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { updateUser } from "../redux/userSlice";
import { checkData } from "../utils/validation";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(
    currentUser || {
      name: "",
      age: "",
      gender: "female",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const valid = await checkData(formData);
    if (valid === true) {
      setFormErrors({});
      dispatch(updateUser(formData));
    } else {
      toast.error("Form data contain errors");
      setFormErrors(valid);
    }
    console.log("updated");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Profile
        </h2>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <TextField
              id="name"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <span className="text-red-600 text-sm">{formErrors.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <TextField
                id="age"
                label="Age"
                name="age"
                variant="outlined"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                fullWidth
              />
              <span className="text-red-600 text-sm">
                {formErrors.age}
              </span>
            </div>

            <div>
              <div>
              <FormControl>
                <FormLabel className="text-gray-700">Gender</FormLabel>
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
              </div>

              <span className="text-red-600 text-sm">
                {formErrors.gender}
              </span>
            </div>
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span className="text-red-600 text-sm">
                {formErrors.password}
              </span>
            </div>
            <div>
              <TextField
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="text-red-600 text-sm">
                {formErrors.confirmPassword}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
