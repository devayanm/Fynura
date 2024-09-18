import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create Project'}
      </button>
      {showForm && <ProjectForm onProjectCreated={handleProjectCreated} />}
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4" key={project._id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
