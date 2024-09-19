import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const ProjectCard = ({ project }) => {
  const progressPercentage =
    ((project.fundsRaised || 0) / (project.fundingGoal || 1)) * 100;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={project.image || "/default-image.png"}
        alt={project.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>

        {/* Funding Goal and Progress Bar with Tooltip */}
        {project.fundingGoal && (
          <div className="mb-3">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  ${project.fundsRaised} raised out of ${project.fundingGoal}
                </Tooltip>
              }
            >
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
            </OverlayTrigger>
            <p>
              Raised: <strong>${project.fundsRaised}</strong> / Goal:{" "}
              <strong>${project.fundingGoal}</strong>
            </p>
          </div>
        )}

        {/* Additional Information */}
        <div className="mb-3">
          <p>
            <strong>Created By:</strong> {project.createdBy || "Anonymous"}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString() || "N/A"}
          </p>
        </div>

        {/* Collaboration Status Badge */}
        <div className="mb-3">
          <span
            className={`badge ${
              project.isCollaborating ? "bg-success" : "bg-secondary"
            }`}
          >
            {project.isCollaborating ? "Collaborating" : "Join to Collaborate"}
          </span>
        </div>

        {/* Tags for Project Categories */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-2">
            {project.tags.map((tag) => (
              <span key={tag} className="badge bg-info me-1">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Call to Action: View Details and Collaborate */}
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/projects/${project._id}`} className="btn btn-primary">
            View Details
          </Link>
          <button className="btn btn-success">
            {project.isCollaborating ? "Collaborating" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
