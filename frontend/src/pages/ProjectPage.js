import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../utils/api"; 
import ExpertReviews from "../components/ExpertReviews";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProject = async () => {
    try {
      const response = await getProjectById(id); 
      setProject(response);
    } catch (error) {
      setError("Failed to load project details. Please try again later.");
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading)
    return <div className="text-center">Loading project details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleContributeClick = () => {
    navigate(`/projects/fund/${id}`);
  };

  return (
    <div className="container">
      {project ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{project.title}</h2>
            <p className="card-text">{project.description}</p>
            <p className="card-text">
              <strong>Funding Goal:</strong> ${project.fundingGoal}
            </p>
            <p className="card-text">
              <strong>Amount Raised:</strong> ${project.amountRaised}
            </p>
            <ExpertReviews projectId={id} />
            <button className="btn btn-primary" onClick={handleContributeClick}>
              Contribute
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">Project not found.</div>
      )}
    </div>
  );
};

export default ProjectPage;
