BufferHelper [![build status](https://secure.travis-ci.org/JacksonTian/bufferhelper.png)](http://travis-ci.org/JacksonTian/bufferhelper)
======
## Why?
Reason of written `bufferhelper`: [小心data事件里的chunk拼接](http://cnodejs.org/topic/4faf65852e8fb5bc65113403).

## Install it via NPM

```  
npm install bufferhelper
```

## Usage

```
var http = require('http');
var BufferHelper = require('bufferhelper');

http.createServer(function (request, response) {
  var bufferHelper = new BufferHelper();

  request.on("data", function (chunk) {
    bufferHelper.concat(chunk);
  });
  request.on('end', function () {
    var html = bufferHelper.toBuffer().toString();
    response.writeHead(200);
    response.end(html);
  });

}).listen(8001);
```

或者更简单：

```
var http = require('http');
var BufferHelper = require('bufferhelper');

http.createServer(function (request, response) {
  var bufferHelper = new BufferHelper();
  bufferHelper.load(request, function (err, buffer) {
    var html = buffer.toString();
    response.writeHead(200);
    response.end(html);
  });
}).listen(8001);
```
