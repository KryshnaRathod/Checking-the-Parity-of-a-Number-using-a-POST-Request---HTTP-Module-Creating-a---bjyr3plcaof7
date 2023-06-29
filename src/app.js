
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(data);

        if (typeof payload.num1 !== 'number') {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Invalid payload. Expected a number.');
        } else {
          const num1 = payload.num1;

          if (num1 % 2 === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`The number ${num1} is even.`);
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`The number ${num1} is odd.`);
          }
        }
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid payload. Expected a valid JSON.');
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

module.exports = server;

