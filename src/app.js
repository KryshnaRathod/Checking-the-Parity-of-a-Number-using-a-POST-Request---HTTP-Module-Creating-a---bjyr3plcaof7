const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      const obj = JSON.parse(body);
      const num1 = obj.num1;

      if (typeof num1 !== 'number' || isNaN(num1)) {
        res.statusCode = 400;
        res.end('Invalid payload. Expected a number.');
      } else {
        if (num1 % 2 === 0) {
          res.statusCode = 200;
          res.end(`The number ${num1} is even.`);
        } else {
          res.statusCode = 404;
          res.end(`The number ${num1} is odd.`);
        }
      }
    });
  }
});

module.exports = server;
