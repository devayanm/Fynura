const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, fundingGoal } = req.body;
    const project = new Project({
      title,
      description,
      fundingGoal,
      creator: req.user.id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('creator');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, fundingGoal } = req.body;
    const project = await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      fundingGoal,
    }, { new: true });

    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
