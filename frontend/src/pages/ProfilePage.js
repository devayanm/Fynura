import React, { useState, useEffect } from "react";
import { getUserProjects } from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { useAuth } from "../utils/auth";

const ProfilePage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserProjects = async () => {
    setLoading(true);
    try {
      const response = await getUserProjects();
      setProjects(response);
    } catch (error) {
      console.error("Error fetching user projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
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
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      {user ? (
        <div>
          <h2 className="text-center mb-4">{user.name}'s Profile</h2>
          <p className="text-center">Email: {user.email}</p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create New Project"}
          </button>
          {showForm && (
            <div className="mb-4">
              <ProjectForm onProjectCreated={handleProjectCreated} />
            </div>
          )}

          <h3 className="mt-4">My Projects</h3>
          {loading ? (
            <div className="text-center">Loading your projects...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="row">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div className="col-md-4 mb-3" key={project._id}>
                    <ProjectCard project={project} />
                  </div>
                ))
              ) : (
                <p className="text-center">No projects found.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
