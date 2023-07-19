const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value = obj.num1;
    
     // Write the code here to check if the number is odd or even
      if (isNaN(value)) {
        // res.statusCode = 400;
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(`${value} is not a number`);
      } else if (value % 2 === 0) {
        // res.statusCode = 200;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`The number ${value} is even`);
      } else if (value % 2 !== 0) {
        // res.statusCode = 404;
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`The number ${value} is odd`);
      }

   });
  }

  
});


module.exports = server;


