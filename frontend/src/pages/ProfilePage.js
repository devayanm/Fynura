import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import { useAuth } from '../utils/auth'; // Use AuthContext to get current user

const ProfilePage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchUserProjects = async () => {
    try {
      const response = await api.get('/projects/user');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const handleProjectCreated = () => {
    setShowForm(false);
    fetchUserProjects();
  };

  return (
    <div className="container">
      {user && (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Create New Project'}
          </button>
          {showForm && <ProjectForm onProjectCreated={handleProjectCreated} />}
          <h3>My Projects</h3>
          <div className="row">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div className="col-md-4 mb-3" key={project._id}>
                  <ProjectCard project={project} />
                </div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
