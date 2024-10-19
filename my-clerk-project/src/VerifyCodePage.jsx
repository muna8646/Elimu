// VerifyCodePage.jsx
import React, { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function VerifyCodePage() {
  const { clerk } = useClerk();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true); // Start the verifying state

    try {
      // Verify the code entered by the user
      await clerk.verifyEmailAddress({ verificationToken: code });
      navigate('/'); // Navigate to home or dashboard upon success
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      console.error(err);
    } finally {
      setIsVerifying(false); // Stop the verifying state
    }
  };

  return (
    <div className="verify-code-container">
      <h1>Verify Your Email</h1>
      {isVerifying ? (
        <div>Verifying your email address, please wait...</div> // Display this while verifying
      ) : (
        <form onSubmit={handleVerifyCode}>
          <label htmlFor="verification-code">Enter your verification code:</label>
          <input
            type="text"
            id="verification-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
}

export default VerifyCodePage;
