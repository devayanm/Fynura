import React, { useState } from 'react';
import api from '../utils/api';

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const project = { title, description, fundingGoal };
      await api.post('/projects', project);
      onProjectCreated();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="fundingGoal">Funding Goal</label>
        <input type="number" id="fundingGoal" className="form-control" value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create Project</button>
    </form>
  );
};

export default ProjectForm;
