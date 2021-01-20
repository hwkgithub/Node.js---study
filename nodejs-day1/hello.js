// console.log('hello world');
var http = require('http');

http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  if(request.url !== '/favicon.ico'){
    console.log('hello world');
    response.write('hello world');
    response.end();
  }
  // console.log(request.url);
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');