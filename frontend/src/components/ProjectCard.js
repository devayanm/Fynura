import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const progressPercentage = (project.fundsRaised / project.fundingGoal) * 100;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>

        {/* Funding Goal and Progress Bar */}
        {project.fundingGoal && (
          <div>
            <div className="progress mb-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progressPercentage.toFixed(0)}%
              </div>
            </div>
            <p>
              Raised: ${project.fundsRaised} / Goal: ${project.fundingGoal}
            </p>
          </div>
        )}

        {/* Call to Action: Join or Collaborate */}
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/projects/${project._id}`} className="btn btn-primary">
            View Details
          </Link>
          <button className="btn btn-success">
            {project.isCollaborating ? "Collaborate" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
