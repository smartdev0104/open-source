const axios = require("axios");

const getReposByOrg = async (req, res) => {
  const { org } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/orgs/${org}/repos?type=all&sort=forks&per_page=30`
    );
    const data = response.data?.sort(
      (itemA, itemB) => itemB.forks - itemA.forks
    );
    res.json(data);
  } catch (error) {
    console.log("error", error.message);
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
    console.log("error", error.message);
    res.status(500).json({ message: "Error fetching commits" });
  }
};

module.exports = {
  getReposByOrg,
  getCommitsByRepo,
};
