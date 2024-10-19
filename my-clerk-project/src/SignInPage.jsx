import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls
import './SignInPage.css';

function SignInPage() {
  const { isSignedIn, user } = useUser(); // Get signed-in status and user data
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      const signInUser = async () => {
        try {
          // Prepare user data to send to the backend
          const userData = {
            email: user.primaryEmailAddress.emailAddress,
            fullName: user.fullName || 'Unknown', // Assuming this field exists
            phoneNumber: user.phoneNumber || '', // Assuming this field exists
            role: 'student' // Default role if not found
          };

          // Send the user data to your backend
          await axios.post('/api/instructors', userData);

          // Fetch role from your backend
          const userId = user.id;
          const response = await axios.get(`/api/get-user-role/${userId}`);
          const userRole = response.data.role;

          // Redirect based on the role
          if (userRole === 'admin') {
            navigate('/admin-dashboard');
          } else if (userRole === 'instructor') {
            navigate('/instructor-dashboard');
          } else if (userRole === 'student') {
            navigate('/dashboard');
          } else {
            navigate('/'); // Default redirect in case of no role
          }
        } catch (error) {
          console.error('Error sending user data to DB:', error);
        }
      };

      signInUser();
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="sign-in-container">
      {/* Left side with title and quote */}
      <div className="left-content">
        <h1 className="title">Elimu Tech Hub</h1>
        <p className="quote">
          "Empowering the innovators of tomorrow through cutting-edge technology and education."
        </p>
      </div>

      {/* Right side with SignIn form */}
      <div className="right-content">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default SignInPage;
