import React from "react";
import CommitsView from "./CommitsView";

const ReposList = ({ repos, orgName }) => (
  <div className="mt-4 mx-4">
    {repos.map((repo) => (
      <div key={repo.id} className="bg-white shadow rounded-lg p-4 mb-4">
        <h4 className="text-xl font-semibold text-blue-800">
          {repo.name} -{" "}
          <span className="text-sm text-gray-600">
            Forks: {repo.forks_count}
          </span>
        </h4>
        <CommitsView repoName={repo.name} orgName={orgName} />
      </div>
    ))}
  </div>
);

export default ReposList;
