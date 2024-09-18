import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <p className="card-text">Goal: ${project.fundingGoal}</p>
        <p className="card-text">Raised: ${project.amountRaised}</p>
        <Link to={`/project/${project._id}`} className="btn btn-primary">View Project</Link>
      </div>
    </div>
  );
};

export default ProjectCard;
