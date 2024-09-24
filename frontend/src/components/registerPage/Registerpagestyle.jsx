import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import '../registerPage/register.css';

const Registerpagestyle = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use axios to make a POST request
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
      });
      console.log('Response from backend:', response.data);
      // Mark form as submitted
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };


  return (
    <div>
      <div>
        <h1 className='heading'>Register</h1>
        <form className="registerbox" onSubmit={handleSubmit}>
          <input
            name="username"
            className='input'
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            name="password"
            className='input'
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input className='button' type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Registerpagestyle;
