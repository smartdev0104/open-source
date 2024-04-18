import React, { useState } from "react";
import Search from "./components/Search";
import ReposList from "./components/ReposList";

function App() {
  const [repos, setRepos] = useState([]);
  const [orgName, setOrgName] = useState("");

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl font-bold my-6">Open-Source Lens</h1>
      <Search setRepos={setRepos} orgName={orgName} setOrgName={setOrgName} />
      <ReposList repos={repos} orgName={orgName} />
    </div>
  );
}

export default App;
