import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <div>
      {project && (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Funding Goal: ${project.fundingGoal}</p>
          <p>Amount Raised: ${project.amountRaised}</p>
          {/* Add payment handling and other functionalities here */}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
