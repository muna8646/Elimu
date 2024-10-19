import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls
import './SignUpPage.css'; // Import external CSS for styling

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpComplete = async (user) => {
    // Prepare user data to send to the backend
    const userData = {
      fullName: user.firstName + ' ' + user.lastName, // Assuming you have these fields
      phoneNumber: user.phoneNumber || '', // Ensure you collect this during sign-up
      country: user.country || '', // Ensure you collect the country
      idNumber: user.idNumber || '', // Ensure you collect the ID number
      school: user.school || '', // Ensure you collect the school
      email: user.email, // User's email
      role: 'student' // Default role
    };

    try {
      // Send user data to your backend
      await axios.post('/api/instructors', userData);
      navigate('/dashboard'); // Redirect to the dashboard after successful sign-up
    } catch (error) {
      console.error('Error sending user data to DB:', error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="sign-up-container">
      <div className="left-content">
        <h1 className="title">Elimu Tech Hub</h1>
        <p className="quote">
          "Empowering the innovators of tomorrow through cutting-edge technology and education."
        </p>
      </div>

      <div className="right-content">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard" // URL to redirect after successful sign-up
          afterSignUp={handleSignUpComplete} // Hook for actions after sign-up
        />
      </div>
    </div>
  );
}

export default SignUpPage;
