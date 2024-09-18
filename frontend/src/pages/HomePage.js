import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../utils/auth";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth(); // Authentication context to check user state

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
      setFeaturedProjects(response.data.slice(0, 3)); // Show first 3 as featured
      setFilteredProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    setShowForm(false);
    fetchProjects();
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = projects.filter((project) =>
        project.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects); // Reset when search is cleared
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Welcome to the Crowdfunding Platform</h1>

      {/* Search and Filter Section */}
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      {/* Create Project Button (only for logged-in users) */}
      {user && (
        <div className="text-center mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create Project"}
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-5">
          <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>
      )}

      {/* Featured Projects Section */}
      <div className="mb-5">
        <h2 className="text-center">Featured Projects</h2>
        <div className="row">
          {featuredProjects.map((project) => (
            <div className="col-md-4 mb-4" key={project._id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* All Projects Section */}
      <div>
        <h2 className="text-center">Explore All Projects</h2>
        <div className="row">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="col-md-4 mb-4" key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="text-center">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
