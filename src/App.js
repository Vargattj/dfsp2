import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio Node.jssssssssss",
      url: "https://github.com/Vargattj/dsf-01",
      techs: ["Node", "Reacttt", "ReactNative"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const filterRepository = repositories.filter(
      (repository) => repository.id !== id
    );
    const response = await api.delete(`repositories/${id}`);
    console.log(response);
    if ((response.status = 204)) {
      console.log("ok");
      setRepositories([...filterRepository]);
    }
    // await api.get("repositories").then((response) => {
    //   setRepositories(response.data);
    // });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <div key={repository.id}>
              <li>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </div>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
