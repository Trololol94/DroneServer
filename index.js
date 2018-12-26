const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {
res.send('Chat Server is running on port 3000')
});

io.on('connection', (socket) => {

    console.log('user connected')
    
    socket.on('join', function(){
        //console.log('Test message by server')
        let  message = {"message":"yawLeft"}



        let check = setInterval(function () {
        socket.emit('newmessage', message)
            }, 1000); 
        
        socket.on('disconnect', function() {
        console.log( 'user has left ')
        clearInterval(check)
    
    
    });
        
    });

});


app.set('port', process.env.PORT || 3000);
//app.set('host', 'testserverbmi.westeurope.cloudapp.azure.com');
server.listen(app.get('port'),()=>{
console.log('Node app is running on port' + app.get('port'))
});
