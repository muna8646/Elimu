import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'; // Import Clerk to retrieve user email
import { ToastContainer, toast } from 'react-toastify'; // Importing toast components
import 'react-toastify/dist/ReactToastify.css'; // Importing default styles for toast
import './InstructorForm.css';  // Importing the CSS for styles

function InstructorForm() {
  const { user } = useUser();  // Getting user info from Clerk
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    country: '',
    idNumber: '',
    school: '',
    email: '' // New field for the email, filled automatically
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Automatically set the user's email from the Clerk user object
  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: user.primaryEmailAddress.emailAddress
      }));
    }
  }, [user]);

  // List of countries for the country selection dropdown
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 
    'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 
    'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
    'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 
    'Central African Republic', 'Chad', 'Chile', 'China', 
    'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 
    'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 
    'Czechia (Czech Republic)', 'Democratic Republic of the Congo', 
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
    'Fiji', 'Finland', 'France', 'Gabon', 
    'Gambia', 'Georgia', 'Germany', 'Ghana', 
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 
    'Hungary', 'Iceland', 'India', 'Indonesia', 
    'Iran', 'Iraq', 'Ireland', 'Israel', 
    'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 
    'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 
    'Lebanon', 'Lesotho', 'Liberia', 'Libya', 
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 
    'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
    'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 
    'Myanmar (Burma)', 'Namibia', 'Nauru', 'Nepal', 
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 
    'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 
    'Oman', 'Pakistan', 'Palau', 'Palestine State', 
    'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 
    'Philippines', 'Poland', 'Portugal', 'Qatar', 
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 
    'Saint Lucia', 'Saint Vincent and the Grenadines', 
    'Samoa', 'San Marino', 'Sao Tome and Principe', 
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 
    'Solomon Islands', 'Somalia', 'South Africa', 
    'South Korea', 'South Sudan', 'Spain', 
    'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 
    'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 
    'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 
    'United Arab Emirates', 'United Kingdom', 
    'United States of America', 'Uruguay', 'Uzbekistan', 
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 
    'Yemen', 'Zambia', 'Zimbabwe'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on new submission

    // Check for duplicates by making a request to the backend
    try {
      const response = await axios.post('http://localhost:5000/api/check-duplicate', {
        phoneNumber: formData.phoneNumber,
        idNumber: formData.idNumber,
        email: formData.email
      });

      // If duplicates found, set error message
      if (response.data.duplicate) {
        setErrorMessage('Duplicate entry detected!'); // Set error message if a duplicate is found
        toast.error('Duplicate entry detected!'); // Show error notification
        return; // Stop the submission
      }

      // If no duplicates, proceed to save the new instructor
      await axios.post('http://localhost:5000/api/instructors', formData);
      toast.success('Application submitted successfully!'); // Show success notification

      // Reset the form after submission
      setFormData({
        fullName: '',
        phoneNumber: '',
        country: '',
        idNumber: '',
        school: '',
        email: user ? user.primaryEmailAddress.emailAddress : '' // Reset email as well
      });
    } catch (error) {
      console.error('There was an error processing the application!', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Set the error message from the server
        toast.error(error.response.data); // Show error notification from the server
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.'); // Generic error message
        toast.error('An unexpected error occurred. Please try again later.'); // Show generic error notification
      }
    }
  };

  return (
    <div className="instructor-form-container">
      <h2>Apply to Become an Instructor</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="instructor-form">
        <label>
          Full Name:
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Phone Number:
          <input 
            type="tel" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required 
            placeholder="Enter your phone number"
          />
        </label>

        <label>
          Country:
          <select 
            name="country" 
            value={formData.country} 
            onChange={handleChange} 
            required
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          ID Number:
          <input 
            type="text" 
            name="idNumber" 
            value={formData.idNumber} 
            onChange={handleChange} 
            required 
            placeholder="Enter your ID number"
          />
        </label>

        <label>
          School Teaching At:
          <input 
            type="text" 
            name="school" 
            value={formData.school} 
            onChange={handleChange} 
            required 
            placeholder="Enter your school"
          />
        </label>

        <input 
          type="hidden" 
          name="email" 
          value={formData.email} 
        />

        <button type="submit">Apply</button>
      </form>
      <ToastContainer /> {/* This will render the toast notifications */}
    </div>
  );
}

export default InstructorForm;
