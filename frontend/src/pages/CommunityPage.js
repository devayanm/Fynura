import React from "react";
import MentorshipRequestForm from "../components/MentorshipRequestForm";

const CommunityPage = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Community Page</h1>
      <p>
        Welcome to the community page! Here you can request mentorship, join
        discussions, and stay updated with upcoming events.
      </p>

      <div className="mb-4">
        <h2>Request Mentorship</h2>
        <MentorshipRequestForm />
      </div>

      <div className="mb-4">
        <h2>Discussion Board</h2>
        <div className="card">
          <div className="card-header">General Discussion</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Discussion 1</li>
            <li className="list-group-item">Discussion 2</li>
            <li className="list-group-item">Discussion 3</li>
          </ul>
          <div className="card-body">
            <a href="/discussions" className="btn btn-primary">
              View All Discussions
            </a>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2>Upcoming Events</h2>
        <div className="card">
          <div className="card-header">Events</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5>Event 1</h5>
              <p>Date: 2024-09-20</p>
            </li>
            <li className="list-group-item">
              <h5>Event 2</h5>
              <p>Date: 2024-09-25</p>
            </li>
            <li className="list-group-item">
              <h5>Event 3</h5>
              <p>Date: 2024-10-01</p>
            </li>
          </ul>
          <div className="card-body">
            <a href="/events" className="btn btn-primary">
              View All Events
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
