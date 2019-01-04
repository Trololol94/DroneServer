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
   
 //socket.emit('newmessage', "takeOff");


   var stdin = process.openStdin();

   stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    let  message = {"message":d.toString().trim()}
    console.log("you entered: [" + d.toString().trim()
         + "]");
    socket.emit('newmessage', message);

  });



/*
        let i=0;

        let messages = [];
        messages[0] = "takeOff";
        messages[1] = "takeOff";
        messages[2] = "yawLeft";
        messages[3] = "yawLeft";
        messages[4] = "yawLeft";
        messages[5] = "yawLeft";
        messages[6] = "landing";

        function intervalFunc() {
        let  message = {"message":messages[i]}
        console.log(message)

        i++;
        socket.emit('newmessage', message);
        if (i == '5') {
                clearInterval(this);     
            }


        }

        setInterval(intervalFunc, 10000);
/*
        let check = setInterval(function () {
        socket.emit('newmessage', messages[i]);
        
            }, 5000); 
        //console.log('user connected 2')

        socket.on('disconnect', function() {
        console.log( 'user has left ')
        clearInterval(check)
    
    
    }); */
        
    });


        socket.on('disconnect', function() {
        console.log( 'disconnect ')
        //socket.broadcast.emit( "userdisconnect" ,' user has left')
    
    
    });

});


app.set('port', process.env.PORT || 3000);
//app.set('host', 'testserverbmi.westeurope.cloudapp.azure.com');
server.listen(app.get('port'),()=>{
console.log('Node app is running on port' + app.get('port'))
});
