import React, { useState, useEffect } from "react";
import RepositoriesService from "./services/RepositoriesService";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await RepositoriesService.fetchRepositories();
      setRepositories(result);
    };

    fetchData();
  }, []);

  async function handleAddRepository() {
    const { id, title, url, techs } = await RepositoriesService.addRepository({
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    });

    setRepositories([
      ...repositories,
      {
        id,
        title,
        url,
        techs,
      },
    ]);
  }

  async function handleRemoveRepository(id) {
    try {
      await RepositoriesService.deleteRepository(id);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
