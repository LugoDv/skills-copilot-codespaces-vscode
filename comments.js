//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var path = urlObj.pathname;
  if(path === '/') {
    fs.readFile('./index.html', function(err, data) {
      if(err) {
        res.end('404');
      } else {
        res.end(data);
      }
    });
  } else if(path === '/post') {
    var comment = urlObj.query;
    comment.ip = req.connection.remoteAddress;
    comment.time = new Date();
    comments.push(comment);
    res.end(JSON.stringify(comments));
  } else {
    res.end('404');
  }
});

server.listen(3000, function() {
  console.log('server is running...');
});