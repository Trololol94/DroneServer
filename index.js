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
        let  message = {"message":"decollage"}

        setTimeout(function () {
        socket.emit('newmessage', message)
            }, 5000); 

        //socket.emit('newmessage', message)
    });

    socket.on('messagedetection', (senderNickname,messageContent) => {
    
        //log the message in console 
    
        console.log(senderNickname+" :" +messageContent)
            //create a message object
    
        let  message = {"message":messageContent, "senderNickname":senderNickname}
        //let message = {"message": "toto", "senderNickname":senderNickname}    
        // send the message to the client side  
    
        socket.broadcast.emit('message', message )
        
    });
    socket.on('disconnect', function() {
        console.log( 'user has left ')
        socket.broadcast.emit( "userdisconnect" ,' user has left')
    
    
    });
    
});

app.set('port', process.env.PORT || 3000);
//app.set('host', 'testserverbmi.westeurope.cloudapp.azure.com');
server.listen(app.get('port'),()=>{
console.log('Node app is running on port' + app.get('port'))
});
