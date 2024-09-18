import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center">Loading projects...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="mb-4">My Projects</h1>
      {projects.length === 0 ? (
        <div className="text-center">No projects found.</div>
      ) : (
        projects.map((project) => (
          <div className="card mb-3" key={project._id}>
            <div className="card-body">
              <h2 className="card-title">{project.title}</h2>
              <p className="card-text">Status: {project.status}</p>
              <p className="card-text">
                Funding Progress: {project.fundingProgress}%
              </p>
              <Link to={`/projects/${project._id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectDashboard;
