import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

function SSOCallback() {
  const navigate = useNavigate();
  const clerk = useClerk();

  useEffect(() => {
    // Handle the redirect callback from SSO
    clerk.handleRedirectCallback()
      .then(() => {
        navigate('/dashboard'); // Redirect to the dashboard after handling
      })
      .catch((err) => {
        console.error("SSO Callback Error:", err);
        navigate('/sign-in'); // Redirect to sign-in on error
      });
  }, [clerk, navigate]);

  return <div>Loading...</div>; // Show a loading message while processing
}

export default SSOCallback;
