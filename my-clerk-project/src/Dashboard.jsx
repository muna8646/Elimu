// Dashboard.jsx
import { UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import './Dashboard.css'; // Import external CSS for styling
import { HiHome, HiBookOpen, HiOutlineClipboardList, HiOutlineCog, HiOutlineSupport, HiOutlineEmojiHappy } from 'react-icons/hi';
import InstructorForm from './InstructorForm/InstructorForm'; // Import InstructorForm component

function Dashboard() {
  const { user } = useUser();
  const clerk = useClerk();
  const [activeSection, setActiveSection] = useState('home'); // Track which section to display
  const [timeRemaining, setTimeRemaining] = useState(null); // Start with no countdown
  const [timerActive, setTimerActive] = useState(false); // Track if the timer is active

  // Function to log out the user
  const handleLogout = () => {
    clerk.signOut(); // Use Clerk's sign out method
  };

  // Reset the inactivity timer on any activity
  const resetTimer = () => {
    if (timerActive) {
      setTimeRemaining(180); // Reset to 3 minutes
    }
  };

  // Effect to track and update inactivity time
  useEffect(() => {
    let countdown;

    // Start countdown only if timer is active
    if (timerActive) {
      countdown = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            handleLogout(); // Logout after the countdown reaches 0
            return null; // Clear the remaining time
          }
          return prevTime - 1;
        });
      }, 1000); // Decrease time every second
    }

    // Clear the timer when component unmounts or timer becomes inactive
    return () => {
      clearInterval(countdown);
    };
  }, [timerActive]);

  // Effect to monitor user activity
  useEffect(() => {
    const events = ['mousemove', 'keypress'];

    const startTimer = () => {
      setTimeRemaining(180); // Set initial countdown
      setTimerActive(true); // Activate timer
    };

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
      window.addEventListener(event, startTimer);
    });

    // Cleanup function to remove event listeners
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
        window.removeEventListener(event, startTimer);
      });
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>LMS Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li onClick={() => setActiveSection('home')}><HiHome /> <a>Home</a></li>
            <li><HiBookOpen /> <a href="/courses">Courses</a></li>
            <li><HiOutlineClipboardList /> <a href="/assignments">Assignments</a></li>
            <li><HiOutlineCog /> <a href="/Grades">Grades</a></li>
            <li><HiOutlineSupport /> <a href="/help">Help</a></li>
            <li onClick={() => setActiveSection('instructorForm')}><HiOutlineEmojiHappy /> <a>Apply as an Instructor</a></li>
            <li><a href="/" onClick={handleLogout}>Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div className="header-content">
            <h2 className="welcome-message">Welcome, {user.firstName || 'User'}!</h2>
            <UserButton className="user-button" /> {/* Provides a logout option */}
          </div>
        </header>

        <div className="welcome-section">
          {activeSection === 'home' && (
            <>
              <h3>Your Dashboard</h3>
              <p>This is your LMS dashboard. You are signed in.</p>
            </>
          )}
          {activeSection === 'instructorForm' && <InstructorForm />}
        </div>

        {/* The countdown display is hidden */}
        {/* <div className="logout-timer">
          <p>Automatic logout in {timeRemaining} seconds.</p>
        </div> */}
      </main>
    </div>
  );
}

export default Dashboard;
