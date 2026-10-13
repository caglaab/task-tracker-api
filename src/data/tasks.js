//görevlerin tutulduğu yer
let tasks = [];
let nextId = 1;

module.exports = {
  getAll: () => tasks,
  getById: (id) => tasks.find((t) => t.id === id),
  add: (data) => {
    const now = new Date().toISOString();
    const task = {
      id: nextId++,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    tasks.push(task);
    return task;
  },
    update: (id, data) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      return null;
    } 
    tasks[index] = {
        ...tasks[index],
        ...data,
        id,
        updatedAt: new Date().toISOString(),
    };
    return tasks[index];
    },
    remove: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return false;
    }
    tasks.splice(index, 1);
    return true;
  },
};