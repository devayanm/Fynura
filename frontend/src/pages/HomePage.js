import React, { useState, useEffect } from "react";
import { getProjects } from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../utils/auth";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response);
      setFeaturedProjects(response.slice(0, 5)); // 5 featured projects for the carousel
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div className="container my-5">
      {/* Header Section */}
      <header className="text-center my-3">
        <h1 className="display-4 font-weight-bold">Fynura Crowdfunding</h1>
        <p className="lead mb-4">
          Empowering innovators to bring their ideas to life with the support of
          a passionate community.
        </p>
        {user && (
          <div className="text-center mb-4">
            <Link to="/explore" className="btn btn-primary btn-lg mx-2">
              Explore Projects
            </Link>
            {user && (
              <button
                className="btn btn-secondary btn-lg mx-2"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "Create New Project"}
              </button>
            )}
          </div>
        )}
        {/* Search Bar */}
        <SearchBar onSearch={() => {}} searchTerm={""} disabled />
      </header>

      {/* Project Form Section */}
      {showForm && (
        <section className="mb-5">
          <div className="card shadow p-4">
            <ProjectForm onProjectCreated={handleProjectCreated} />
          </div>
        </section>
      )}

      {/* Dynamic Statistics */}
      <section className="statistics text-center mb-5">
        <div className="row">
          <div className="col-lg-4">
            <h4>1000+ Projects Funded</h4>
          </div>
          <div className="col-lg-4">
            <h4>$5M Raised</h4>
          </div>
          <div className="col-lg-4">
            <h4>5000+ Backers</h4>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects mb-5">
        <h2 className="text-center mb-4">Featured Projects</h2>
        {loading ? (
          <div className="text-center">Loading featured projects...</div>
        ) : (
          <Carousel>
            {featuredProjects.map((project) => (
              <Carousel.Item key={project._id}>
                <div className="d-flex justify-content-center">
                  <ProjectCard project={project} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </section>

      {/* Popular Categories Section */}
      <section className="popular-categories text-center mb-5">
        <h2 className="mb-4">Explore Popular Categories</h2>
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-3 col-sm-4 mb-3">
            <Link to="/category/tech" className="btn btn-outline-primary">
              Tech
            </Link>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 mb-3">
            <Link to="/category/art" className="btn btn-outline-primary">
              Art
            </Link>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 mb-3">
            <Link to="/category/social" className="btn btn-outline-primary">
              Social Impact
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories text-center mb-5">
        <h2 className="mb-4">Success Stories</h2>
        <p className="lead mb-4">
          Discover how Fynura has helped creators achieve their goals.
        </p>
        <div className="row">
          <div className="col-md-4">
            <div className="card p-4">
              <h5>John's Tech Invention</h5>
              <p>Raised $50,000 to develop his innovative AI solution.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4">
              <h5>Anna's Art Exhibition</h5>
              <p>Gathered $25,000 to launch her art exhibition.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4">
              <h5>Sara's Social Impact</h5>
              <p>Received $100,000 to improve education in rural areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="text-center mt-5">
        <h3 className="mb-3">Want to explore more amazing projects?</h3>
        <Link to="/explore" className="btn btn-outline-dark btn-lg">
          Explore More Projects
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
