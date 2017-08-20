const WebSocket = require('ws');
const express = require('express');
const redis = require('redis');
const path = require('path');
const db = redis.createClient();
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

db.on('connect', function(){
    console.log('connected to redis');
});

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    d = JSON.parse(data);
    if(d.type === 'image') {
      db.set('image', d.data, function(){
      })
    }
    
    if(d.type === 'stroke') {      
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  });
  db.get('image', function(err, reply){
    var init = {};
    init.type = 'init';
    init.data = reply;
    ws.send(JSON.stringify(init));
  })
});


app.listen(8080);
