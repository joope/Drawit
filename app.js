const express = require('express');
const redis = require('redis');
const path = require('path');

const db = redis.createClient();
const app = express();
const server = require('http').Server(app);  
const io = require('socket.io')(server);


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

db.on('connect', function(){
    console.log('connected to redis');
});

io.on('connection', function connection(client) {
  console.log(client.id + ' connected');
  
  db.get('image', function(err, reply) {
    client.emit('init', reply);
  })

  client.on('save', function incoming(data) {
    db.set('image', data, function(){
    })
  })
  
  client.on('stroke', function(stroke) {
    // do some checks here
    client.broadcast.emit('stroke', stroke);
  })
  
  client.on('disconnect', function(){
    console.log(client.id + ' disconnected');
  })

});


server.listen(8080);
