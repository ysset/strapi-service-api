const { Server } = require('socket.io');

const io = new Server(8080, {
    path: '/bots',
    transports: ['websocket'],
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

strapi.io = io;
