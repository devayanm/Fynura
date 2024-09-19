import React, { useState, useEffect } from "react";
import { getProjects } from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import Spinner from "react-bootstrap/Spinner"; // Bootstrap spinner
import Alert from "react-bootstrap/Alert"; // For error handling and no projects alert

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6); // Dynamic page size

  const fetchProjects = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await getProjects();
      setProjects(response);
      setFilteredProjects(response);
    } catch (error) {
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Debounce search to improve search experience and reduce unnecessary rerenders
  const debounceSearch = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const handleSearch = debounceSearch((term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = projects.filter((project) =>
        project.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, 300);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (e) => {
    setProjectsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 on page size change
  };

  // Get current projects for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Explore Public Projects</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      {/* Page Size Dropdown */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p>Displaying {projectsPerPage} projects per page</p>
        <div>
          <select
            className="form-select form-select-sm"
            value={projectsPerPage}
            onChange={handlePageSizeChange}
          >
            <option value="6">6 per page</option>
            <option value="9">9 per page</option>
            <option value="12">12 per page</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />{" "}
          {/* Loading Spinner */}
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : currentProjects.length > 0 ? (
        <div className="row">
          {currentProjects.map((project) => (
            <div className="col-md-4 mb-4" key={project._id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="warning" className="text-center">
          No public projects found.
        </Alert>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePagination(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ExploreProjects;
