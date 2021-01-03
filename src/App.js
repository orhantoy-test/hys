import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [snippets, setSnippets] = useState({ status: "loading" });

  useEffect(() => {
    fetch("/api/snippets")
      .then((res) => res.json())
      .then((json) => setSnippets({ status: "success", data: json.snippets }));
  }, []);

  return (
    <div>
      <header>
        <h1>
          Hack Your <strong>Snippets</strong>
        </h1>
      </header>

      {snippets.status === "loading" && <em>Loading snippets...</em>}

      {snippets.status === "success" &&
        snippets.data.map((snippet) => (
          <Snippet key={snippet.id} {...snippet} />
        ))}
    </div>
  );
}

function Snippet({ id, name, value, starCount }) {
  return (
    <div className="SnippetContainer">
      <h2>
        {name}
        <button className="SnippetStarBtn">
          <span className="SnippetStarBtn__symbol">⭐️</span>
          {starCount}
        </button>
      </h2>
      <pre>
        <code>{value}</code>
      </pre>
    </div>
  );
}

export default App;
