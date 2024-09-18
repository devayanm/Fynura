import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me'); // Endpoint for fetching user profile
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const response = await api.get('/projects/user');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserProjects();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          <h3>My Projects</h3>
          <div className="row">
            {projects.map((project) => (
              <div className="col-md-4" key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
