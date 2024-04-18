import React from "react";

const CommitDetails = ({ commitData }) => {
  if (!commitData) return <p>No commit data available.</p>;

  const { commit, html_url, author, committer } = commitData;

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 my-5">
      <h3 className="text-lg font-bold">Commit Details</h3>
      <p className="text-sm">
        <strong>Message:</strong> {commit.message}
      </p>
      <p className="text-sm">
        <strong>Author:</strong>
        <a
          href={author?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          {commit.author.name}
        </a>
      </p>
      <p className="text-sm">
        <strong>Committer:</strong>
        <a
          href={committer?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          {commit.committer.name}
        </a>
      </p>
      <p className="text-sm">
        <strong>Date:</strong>
        {new Date(commit.author.date).toLocaleDateString()}
      </p>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      >
        View Commit on GitHub
      </a>
    </div>
  );
};

export default CommitDetails;
