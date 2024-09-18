import React, { useState } from "react";
import api from "../utils/api";

const MentorshipRequestForm = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    if (message.trim().length < 10) {
      setFeedback("Message must be at least 10 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/mentorship/requests", { message });
      setFeedback("Mentorship request submitted successfully!");
      setMessage("");
    } catch (error) {
      setFeedback("Failed to submit request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Request Mentorship</h2>
      <form onSubmit={handleRequest}>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ resize: "none" }}
          />
        </div>
        {feedback && (
          <div
            className={`alert ${
              feedback.startsWith("Failed") ? "alert-danger" : "alert-success"
            } mt-3`}
          >
            {feedback}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Request"}
        </button>
      </form>
    </div>
  );
};

export default MentorshipRequestForm;
