// VerifyEmailAddress.jsx
import React, { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function VerifyEmailAddress() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { clerk } = useClerk();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true); // Start the verifying process
    setError(null); // Clear any previous errors

    try {
      // Call Clerk's verifyEmailAddress with the entered code
      await clerk.verifyEmailAddress({ verificationToken: code });
      navigate('/'); // Redirect to home or dashboard upon success
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      console.error(err);
    } finally {
      setIsVerifying(false); // Stop the verifying process
    }
  };

  return (
    <div className="verify-code-container">
      <h1>Verify Your Email</h1>
      <form onSubmit={handleVerifyCode}>
        <label htmlFor="verification-code">Enter your verification code:</label>
        <input
          type="text"
          id="verification-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" disabled={isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default VerifyEmailAddress;
