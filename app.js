var express = require('express');
var socket= require('socket.io');

//app setup
var app = express();
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("listen to requests on port 3000");
})

//static files (middlewares)
app.use(express.static('public'));


//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    //handle chat event
    socket.on('chat', function(data){
        io.emit('chat', data);
    })

    //broadcasting
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
})