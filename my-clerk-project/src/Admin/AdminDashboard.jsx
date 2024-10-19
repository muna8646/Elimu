import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instructors');
        setInstructors(response.data); // Assuming response.data is an array
      } catch (err) {
        setError(err);
        console.error('Error fetching instructors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return <div>Loading instructors...</div>;
  }

  if (error) {
    return <div>Error loading instructors: {error.message}</div>;
  }

  return (
    <div>
      <h1>Instructors</h1>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id}>
            {instructor.fullName} - {instructor.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
