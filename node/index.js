// Backend for chat app that will handle socket.io connection
const io = require('socket.io')(8000);

const users = {};

// connection created using io.on
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{ // socket.on if a event happen do this
        //console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // tell everyone in teh grp  except me
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});

    });
});