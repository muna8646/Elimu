import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Dashboard from './Dashboard';
import SSOCallback from './SSOCallback';
import VerifyEmailAddress from './VerifyEmailAddress';
import AdminDashboard from './Admin/AdminDashboard';
import InstructorDashboard from './InstructorForm/Instructordashboard';

function App() {
  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in/sso-callback" element={<SSOCallback />} />
          <Route path="/verify-email-address" element={<VerifyEmailAddress />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
