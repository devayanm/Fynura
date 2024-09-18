import React, { useState } from "react";
import api from "../utils/api";

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !goals || !fundingGoal) {
      setError("All fields are required.");
      return;
    }

    if (fundingGoal <= 0) {
      setError("Funding goal must be a positive number.");
      return;
    }

    try {
      await api.post("/projects", { title, description, goals, fundingGoal });
      setSuccess("Project created successfully!");
      onProjectCreated(); 
      setTitle("");
      setDescription("");
      setGoals("");
      setFundingGoal("");
    } catch (error) {
      setError("Error creating project. Please try again.");
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="container">
      <h3>Create New Project</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="goals">Goals:</label>
          <textarea
            id="goals"
            className="form-control"
            rows="4"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fundingGoal">Funding Goal:</label>
          <input
            id="fundingGoal"
            type="number"
            className="form-control"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
