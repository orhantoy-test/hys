import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Model, Server } from "miragejs";

new Server({
  models: {
    snippet: Model,
  },

  seeds(server) {
    server.create("snippet", {
      id: "1",
      name: "README.md",
      value: "# Title\n\nHey there!",
      starCount: 0,
    });
    server.create("snippet", {
      id: "2",
      name: "index.js",
      value: "console.log('Smile'); // \uD83D\uDE00",
      starCount: 13,
    });
    server.create("snippet", {
      id: "3",
      name: "main.c",
      value: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`,
      starCount: 7,
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/snippets", (schema) => {
      return schema.snippets.all();
    });

    this.post("/snippets/:id/stars", (schema, request) => {
      let id = request.params.id;
      let snippet = schema.snippets.find(id);
      snippet.update({ starCount: snippet.starCount - 1 });

      return schema.snippets.all();
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
