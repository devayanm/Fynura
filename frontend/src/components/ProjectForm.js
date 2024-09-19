import React, { useState } from "react";
import { createProject } from "../utils/api";

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
    "Technology",
    "Health",
    "Education",
    "Art",
    "Environment",
    "Community",
    "Finance",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !goals || !fundingGoal || !category) {
      setError("All fields are required.");
      return;
    }

    if (fundingGoal <= 0) {
      setError("Funding goal must be a positive number.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goals", goals);
    formData.append("fundingGoal", fundingGoal);
    formData.append("category", category);
    if (file) {
      formData.append("file", file);
    }

    try {
      await createProject(formData);
      setSuccess("Project created successfully!");
      onProjectCreated();
      resetForm();
    } catch (error) {
      setError("Error creating project. Please try again.");
      console.error("Error creating project:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGoals("");
    setFundingGoal("");
    setCategory("");
    setFile(null);
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
            required
            placeholder="Enter project title"
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
            required
            placeholder="Provide a detailed description of the project"
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
            required
            placeholder="List the goals you aim to achieve"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fundingGoal">Funding Goal ($):</label>
          <input
            id="fundingGoal"
            type="number"
            className="form-control"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(Number(e.target.value))}
            required
            placeholder="Set your funding goal"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="file">Upload Supporting Document (optional):</label>
          <input
            id="file"
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
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
