// App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import SignInPage from './SignInPage'; // Import the SignInPage component
import Dashboard from './Dashboard'; // Import the Dashboard component

function App() {
  const { isSignedIn } = useUser(); // Get the signed-in state

  return (
    <Router>
      <div className="App">
        <h1>Welcome to My Application</h1>

        <Routes>
          {/* Redirect to Dashboard if signed in */}
          <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <SignInPage />} />
          <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
