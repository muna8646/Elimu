// Dashboard.jsx
import { useUser, UserButton } from '@clerk/clerk-react';

function Dashboard() {
  const { user } = useUser(); // Get user info from Clerk

  return (
    <div>
      <h2>Dashboard</h2>
      <UserButton /> {/* This allows the user to log out or manage their profile */}
      <p>Welcome, {user.firstName || 'User'}!</p> {/* Display user's first name */}
      <p>This is your dashboard where you can manage your account.</p>
    </div>
  );
}

export default Dashboard;
