import { useState } from "react";

const FormWithoutYup = () => {

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

    const countryCodes = [
        { code: "+91", name: "India" },
        { code: "+1", name: "USA" },
        { code: "+44", name: "UK" },
      ];

    
    const validateForm = () => {};

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if(isValid)
        {
            console.log("Form submitted", formData);
        }
        else
        {
            console.log("Form Validation failed");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]:value,
        })
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{marginLeft : '10px'}}>Show/Hide</button>
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
                style={{marginLeft : '10px'}}
                onChange={handleChange}
            />
        </div>

        <div>
            <label>Country: </label>
            <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
            </select>
      </div>

      <div>
        <label>City: </label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="Delhi">Delhi</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
        </select>
      </div>

      <div>
        <label>Pan Number: </label>
        <input 
            type="text" 
            name="panNo"
            value={formData.panNo}
            placeholder="Enter your PAN number"
            onChange={handleChange}
        />
      </div>

      <div>
        <label>Aadhar Number: </label>
        <input 
            type="text" 
            name="aadharNumber"
            value={formData.aadharNo}
            placeholder="Enter your Aadhar number"
            onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormWithoutYup