import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, createPaymentIntent } from "../utils/api";

const FundingPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
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

    fetchProject();
  }, [id]);

  const handleFunding = async () => {
    setError("");
    setSuccess("");

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await createPaymentIntent({
        projectId: project._id,
        amount: Number(amount),
      });
      setSuccess("Your contribution has been successful!");
      setAmount("");
    } catch (error) {
      setError("Failed to contribute. Please try again later.");
      console.error("Error contributing to project:", error);
    }
  };

  if (loading)
    return <div className="text-center">Loading project details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Fund Project: {project.title}</h1>
      <div className="card shadow-sm mb-4" style={{ borderRadius: "0.5rem" }}>
        <div className="card-body">
          <h5 className="card-title">Project Overview</h5>
          <p className="card-text">{project.description}</p>
          <p>
            <strong>Funding Goal:</strong> ${project.fundingGoal}
          </p>
          <p>
            <strong>Funds Raised:</strong> ${project.fundsRaised}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h4 className="mb-3">Enter Amount to Contribute</h4>
      <div className="form-group">
        <input
          id="amount"
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
          style={{ maxWidth: "300px" }} // Optional: limit width
        />
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={handleFunding}
        disabled={loading}
      >
        Contribute
      </button>
      {success && <div className="alert alert-success mt-2">{success}</div>}
    </div>
  );
};

export default FundingPage;
