const User = require("../models/User");
const Project = require("../models/Project");

exports.addMentorship = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user || !project)
      return res.status(404).json({ message: "User or project not found" });

    user.mentorships.push(projectId);
    await user.save();

    project.collaborators.push(userId);
    await project.save();

    res.status(200).json({ message: "Mentorship added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
