//make connection
var socket = io.connect('https://chat-app-yangge.herokuapp.com');
//var socket = io.connect('http://localhost:3000');
//var socket = socketIO(server);


//qurery DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


//Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

//listen for events (listeing from server ("chat"))
socket.on('chat', function(data){
    feedback.innerHTML ="";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
})


//broadcasting
message.addEventListener('keypress',function(){
    socket.emit('typing', handle.value);
})
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})