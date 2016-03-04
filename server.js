var fs = require('fs');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.use("/board", express.static(__dirname + '/4chan'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/views", express.static(__dirname + '/views'));

// Load Index
app.get('/', function(request, response) {
  response.sendFile(__dirname +'/views/index.html');
})

// Get monitored post
app.get('/api/:board/:thread/:postnum', function(request, response) {
  var board = request.params.board;
  var thread = request.params.thread;
  var postnum = parseInt(request.params.postnum);
  var file = thread + ".json";
  var filePath = './4chan/' + board + '/' + thread + "/" + file;
  var json = fs.readFile(filePath, function(err, data){
    if (err) throw err;
    json = JSON.parse(data);

    // Find the monitored post
    var monitored_post = "";
    for (var post in json.posts){
      if (json.posts[post].no === postnum) {
        monitored_post = json.posts[post];
        break;
      }
    }

    response.json(monitored_post);
  });
})

// Get replies to monitored post
app.get('/api/:board/:thread/:postnum/replies', function(request, response) {
  var board = request.params.board;
  var thread = request.params.thread;
  var postnum = request.params.postnum;
  var file = thread + ".json";
  var filePath = './4chan/' + board + '/' + thread + "/" + file;
  var json = fs.readFile(filePath, function(err, data){
    if (err){
       response.write(err);
    }
    else {
      json = JSON.parse(data);

      // Find the responses
      var responses = [];
      for (var post in json.posts){
        if (json.posts[post].hasOwnProperty('com') && json.posts[post].com.toString().indexOf(postnum) !== -1){
          responses.push(json.posts[post]);
        }
      }

      response.json(responses);
    }
  });
})

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('json_updated', function(data){
    console.log('json was updated');
  })
})

server.listen(3000, function(){
  console.log('Caturday backup running on port 3000');
})
