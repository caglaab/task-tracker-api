const store = require('../data/tasks');
const STATUSES = ['todo', 'in-progress', 'done'];

const PRIORITIES = ['low', 'medium', 'high'];

exports.createTask = (req, res) => {
  const {title,description,status, priority, assigneedId, projectId} = req.body;
  if(!title){
    return res.status(400).json({error: 'Title is required'});
  }
  if(status&& !STATUSES.includes(status)){
    return res.status(400).json({error: 'Invalid status'});
  }
  if(priority && !PRIORITIES.includes(priority)){
    return res.status(400).json({error: 'Invalid priority'});
  }

  const task = store.add({
    title,
    description:description || '',
    status: status || 'todo',
    priority: priority || 'medium',
    assigneedId: assigneedId || null,
    projectId: projectId || null,
  });
  res.status(201).json(task);
}
exports.getAllTasks = (req, res) => {
    let result = store.getAll();
    const {status, priority, assigneedId} = req.query;
    if(status){
        result = result.filter((t) => t.status === status);
    }
    if(priority){
        result = result.filter((t) => t.priority === priority);
    }
    if(assigneedId){
        result = result.filter((t) => t.assigneedId === assigneedId);
    }
    
    res.json(result);
}
exports.getTaskById = (req, res) => {
    const task = store.getById(Number(req.params.id));
    if(!task){
        return res.status(404).json({error: 'Task not found'});
    }
    res.json(task);
};
exports.updateTask = (req, res) => {
    
    const {status, priority} = req.body;
    if(status && !STATUSES.includes(status)){
        return res.status(400).json({error: 'Invalid status'});
    }
    if(priority && !PRIORITIES.includes(priority)){
        return res.status(400).json({error: 'Invalid priority'});
    }
    const updated = store.update(Number(req.params.id), req.body);
    if(!updated){
        return res.status(404).json({error: 'Task not found'});
    }
    res.json(updated);
};
exports.deleteTask = (req, res) => {
    const ok = store.remove(Number(req.params.id));
    if(!ok){
        return res.status(404).json({error: 'Task not found(404)'});
    }
    res.status(204).end();
};
