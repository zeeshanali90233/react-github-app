import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async (searchTerm) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchTerm}`
    );
    const data = await response.json();
    return data.items || [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRepositories("react");
      setRepositories(data);
   };
   fetchData();
  }, []);

  const searchGithub = async (e) => {
    e.preventDefault();
    const data = await getRepositories(query);
    setRepositories(data);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          GitHub Repository Search
        </h1>

        <form onSubmit={searchGithub} className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <label htmlFor="query" className="block text-lg font-medium mb-2">
              Search Query
            </label>
            <div className="flex gap-2">
              <input
                id="query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter search term..."
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </form>

        {repositories.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Results:</h2>
            <div className="grid gap-4">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
                >
                  <img src={repo.owner.avatar_url} alt={repo.owner.login}  className="rounded-full w-20 h-20"/>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {repo.full_name}
                  </a>
                  <p className="text-gray-600 mt-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && <span>💻 {repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
