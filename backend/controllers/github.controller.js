const axios = require("axios");

const getReposByOrg = async (req, res) => {
  const { org } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/orgs/${org}/repos?type=all&sort=forks&per_page=30`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching repositories" });
  }
};

const getCommitsByRepo = async (req, res) => {
  const { org, repo } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${org}/${repo}/commits?per_page=30`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching commits" });
  }
};

module.exports = {
  getReposByOrg,
  getCommitsByRepo,
};
