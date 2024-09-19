import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, createPaymentIntent } from "../utils/api"; // Correct import

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
        const response = await getProjectById(id); // Use the correct function
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
      setAmount(""); // Clear the input field
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
      <h1>Fund Project: {project.title}</h1>
      <p>{project.description}</p>
      <div className="form-group">
        <label htmlFor="amount">Enter amount to contribute:</label>
        <input
          id="amount"
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
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
