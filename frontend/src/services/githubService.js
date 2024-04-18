import axiosApi from "../axiosApi";

const fetchRepos = async (orgName) => {
  try {
    const response = await axiosApi.get(`/api/github/repos/${orgName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchCommits = async (orgName, repoName) => {
  try {
    const response = await axiosApi.get(
      `/api/github/commits/${orgName}/${repoName}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchRepos, fetchCommits };
