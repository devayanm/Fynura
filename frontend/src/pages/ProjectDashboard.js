import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProjects } from "../utils/api"; // Updated API call to fetch only user-specific projects
import { useAuth } from "../utils/auth";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth(); // Get current logged-in user

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getUserProjects(user.id); // Fetch only user's projects
        setProjects(response);
      } catch (error) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user.id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <div className="text-center">Loading your projects...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1 className="mb-4">My Projects</h1>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search your projects..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Project List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center">No projects found.</div>
      ) : (
        <div className="row">
          {filteredProjects.map((project) => (
            <div className="col-md-4 mb-3" key={project._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  <p className="card-text">Status: {project.status}</p>
                  <p className="card-text">
                    Funding Progress: {project.fundingProgress}%
                  </p>
                  <Link
                    to={`/projects/${project._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/projects/edit/${project._id}`}
                    className="btn btn-secondary mx-2"
                  >
                    Edit Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Project Button */}
      <div className="text-center mt-4">
        <Link to="/projects/new" className="btn btn-success">
          Create New Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectDashboard;
