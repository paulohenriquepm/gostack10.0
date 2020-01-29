const { Router } = require('express');

const routes = Router();

const projects = [];

var requisições = 0;

//Middlewares
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const findProject = projects.find(p => p.id == id);

  if(!findProject){
    return res.status(400).json({ error: 'Project not found!' });
  }

  return next();
 };

function countReqs(req, res, next) {
  requisições++;
  console.log("Quantidade de Requisições até agora: " + requisições);

  return next();
}

//Rotas
routes.get('/projects', countReqs, (req, res) => {
  return res.send(projects);
});

routes.post('/projects', countReqs, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.send(projects);
});

routes.post('/projects/:id/tasks', checkProjectExists, countReqs, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const findProject = projects.find(p => p.id == id);

  findProject.tasks.push(tasks);

  return res.json(projects);
});

routes.put('/projects/:id', checkProjectExists, countReqs, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
 
  const findProject = projects.find(p => p.id == id);

  findProject.title = title;

  return res.json(projects);
});

routes.delete('/projects/:id', checkProjectExists, countReqs, (req, res) => {
  const { id } = req.params;

  const findProjectIndex = projects.find(p => p.id == id);
  
  projects.slice(findProjectIndex, 1);

  return res.json(projects);
})

module.exports = routes;