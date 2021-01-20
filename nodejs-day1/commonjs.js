var http = require('http');

// 模块的引用
var sayHello = require('./util').sayHello;
var add = require('./util').add;

http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  if(request.url !== '/favicon.ico'){

    // 模块方法的调用
    response.write(sayHello().toString());
    response.write('<br/>');
    response.write(add(3, 4).toString());

    response.end();
  }
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');