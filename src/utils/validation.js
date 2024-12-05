export const validateName = (name) => /^[a-zA-Z]{3,12}$/.test(name);
export const validateAge = (age) => /^[0-9]{1,3}$/.test(age);
export const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
export const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
export const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;
export const validateRole = (role) => role !== "";
export const validateGender = (gender) => gender === "male" || gender === "female";


export const checkData = (formData) => {
  const errors = {};
  const validationRules = {
    name: validateName,
    age: validateAge,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (value, formData) => validateConfirmPassword(formData.password, value),
    role: validateRole,
    gender: validateGender,
  };

  for (const [key, value] of Object.entries(formData)) {
    if (validationRules[key]) {
      const isValid = validationRules[key](value, formData);

      if (!isValid) {
        let errorMessage = '';

        switch (key) {
          case 'name':
            errorMessage = 'Name must be at least 3 characters and contain only alphabets.';
            break;
          case 'age':
            errorMessage = 'Age must be a valid.';
            break;
          case 'email':
            errorMessage = 'Invalid email format.';
            break;
          case 'password':
            errorMessage = 'Password must contain a capital letter, a number, a symbol, and be at least 6 characters.';
            break;
          case 'confirmPassword':
            errorMessage = 'Passwords do not match.';
            break;
          case 'role':
            errorMessage = 'Role is required.';
            break;
          case 'gender':
            errorMessage = 'Please select a valid gender.';
            break;
          default:
            errorMessage = 'Invalid field value.';
        }

        errors[key] = errorMessage;
      }
    }
  }

  return Object.keys(errors).length > 0 ? errors : true;
};
