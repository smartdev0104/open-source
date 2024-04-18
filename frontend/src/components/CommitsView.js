import React, { useState } from "react";
import { fetchCommits } from "../services/githubService";
import { ClipLoader } from "react-spinners";
import CommitDetails from "./CommitDetails";

const CommitsView = ({ repoName, orgName }) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleFetchCommits = () => {
    if (!hasFetched) {
      setLoading(true);
      fetchCommits(orgName, repoName)
        .then((commits) => {
          setCommits(commits);
          setLoading(false);
          setHasFetched(true); // Ensure commits are fetched only once unless specifically intended otherwise
        })
        .catch(() => {
          setLoading(false);
          setHasFetched(true); // Handle error but prevent refetching on error
        });
    }
  };

  return (
    <div>
      <h3 className="text-md font-semibold mt-2">Recent Commits:</h3>
      <button
        onClick={handleFetchCommits}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded my-2"
      >
        Load Commits
      </button>
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" />
        </div>
      ) : (
        <div>
          {commits.map((commit) => (
            <CommitDetails key={commit.sha} commitData={commit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommitsView;
