import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const progress = (project.amountRaised / project.fundingGoal) * 100;

  return (
    <div
      className="card shadow-sm h-100"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text flex-grow-1">{project.description}</p>
        <p>Funding Goal: ${project.fundingGoal}</p>
        <p>Amount Raised: ${project.amountRaised}</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
