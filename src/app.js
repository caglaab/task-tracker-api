const express = require('express');
const logger = require('./middlewares/logger');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
app.use(express.json());
app.use(logger);
app.get('/', (req, res) => {
  res.json({ message: 'Görev Takip  API çalışıyor' });
});

app.use('/api/tasks', taskRoutes); 

module.exports = app;
