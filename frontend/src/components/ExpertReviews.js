import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const ExpertReviews = ({ projectId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [projectId]);

  if (loading) return <div className="text-center">Loading reviews...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Expert Reviews</h2>
      <div className="row">
        {reviews.map((review) => (
          <div className="col-md-4 mb-3" key={review._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{review.expertName}</h5>
                <p className="card-text">{review.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertReviews;
