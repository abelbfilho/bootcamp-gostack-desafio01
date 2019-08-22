const express = require("express");
const server = express();

var nTotalRequisicoes = 0;
const projects = [
  {
    id: "1",
    title: "Projeto Cumbica",
    tasks: []
  },
  {
    id: "3",
    title: "Projeto Galeão",
    tasks: []
  },
  {
    id: "2",
    title: "Projeto Viracopos",
    tasks: []
  }
];

server.use(express.json());

//MIDDLEWARE
server.use((req, res, next) => {
  nTotalRequisicoes++;
  console.log(`Total de requisições: ${nTotalRequisicoes}`);
  return next();
});

function checkId(req, res, next) {
  const { id } = req.params;
  req.posId = -1;
  projects.forEach((element, index) => {
    if (element.id == id) {
      req.posId = index;
    }
  });

  if (req.posId < 0) {
    return res.status(400).json({ error: "Id not found!" });
  }

  return next();
}

//POST PROJECTS - INSERT - NEW PROJECT
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

//GET PROJECTS - READ - LIST PROJECTS
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//PUT PROJECTS - REPLACE - REPLACE PROJECT TITLE
server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[req.posId].title = title;

  return res.json(projects);
});

//DELETE PROJECT - DELETE - DELETE PROJECTS
server.delete("/projects/:id", checkId, (req, res) => {
  projects.splice(req.posId, 1);

  return res.send();
});

//POST TASKS - INSERT - INSERT TASKS IN A PROJECT
server.put("/projects/:id/tasks", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[req.posId].tasks.push(title);

  return res.json(projects);
});
server.listen(3333);
