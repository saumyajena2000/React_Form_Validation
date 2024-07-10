import React, { useState } from 'react';
import * as Yup from 'yup';

const countryCodes = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
  phoneNo: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone Number is required'),
  countryCode: Yup.string().required('Country Code is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  panNo: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format')
    .required('PAN Number is required'),
  aadharNo: Yup.string()
    .matches(/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar number format')
    .required('Aadhar Number is required'),
});

function FormWithYup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    countryCode: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log('Form submitted', formData);
      // handle successful form submission, e.g., navigate to another page or show a success message
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name."
          onChange={handleChange}
        />
        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
      </div>

      <div>
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name."
          onChange={handleChange}
        />
        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
      </div>

      <div>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter your username."
          onChange={handleChange}
        />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email."
          onChange={handleChange}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div>
        <label>Password: </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          placeholder="Enter password."
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '10px' }}>Show/Hide</button>
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      <div>
        <label>Phone Number: </label>
        <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
          <option value="">Select Country Code</option>
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>{country.name} ({country.code})</option>
          ))}
        </select>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          placeholder="Enter phone number"
          style={{ marginLeft: '10px' }}
          onChange={handleChange}
        />
        {errors.phoneNo && <div style={{ color: 'red' }}>{errors.phoneNo}</div>}
      </div>

      <div>
        <label>Country: </label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
      </div>

      <div>
        <label>City: </label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="Delhi">Delhi</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
        </select>
        {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
      </div>

      <div>
        <label>PAN Number: </label>
        <input
          type="text"
          name="panNo"
          value={formData.panNo}
          placeholder="Enter your PAN number"
          onChange={handleChange}
        />
        {errors.panNo && <div style={{ color: 'red' }}>{errors.panNo}</div>}
      </div>

      <div>
        <label>Aadhar Number: </label>
        <input
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          placeholder="Enter your Aadhar number"
          onChange={handleChange}
        />
        {errors.aadharNo && <div style={{ color: 'red' }}>{errors.aadharNo}</div>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormWithYup;
