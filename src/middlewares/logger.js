const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'requests.log');

fs.mkdirSync(logDir, { recursive: true });

module.exports = (req, res, next) => {
  const line = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;

  console.log(line);

  fs.appendFile(logFile, line, (err) => {   
    if (err) {
      console.error('Log dosyasına yazılamadı:', err);
    }
    next();
  });
};