import React, { useState } from "react";
import { fetchRepos } from "../services/githubService";
import { ClipLoader } from "react-spinners";

const Search = ({ setRepos, orgName, setOrgName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const repos = await fetchRepos(orgName);
      setRepos(repos);
    } catch (error) {
      setError(
        "Failed to fetch repositories. Please check the organization name and try again."
      );
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <input
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Enter GitHub organization name"
        className="input border-2 border-gray-300 p-2 rounded-md mb-2 w-full max-w-xs"
      />
      <button
        onClick={handleSearch}
        disabled={!orgName || loading}
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full max-w-xs mb-5"
      >
        Search
      </button>
      {loading && <ClipLoader color="#4A90E2" />}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Search;
