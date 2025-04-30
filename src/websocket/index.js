const { Server } = require('socket.io');
const events = require('./events');

const io = new Server(8080, {
    path: '/bots',
    transports: ['websocket'],
});

io.on('connection', function(socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on(events.botList, async function() {
        const bots = await  strapi.entityService.findMany('api::bot.bot', {
            filter: {
                isActive: true,
            }
        })
        io.emit(events.botList, JSON.stringify(bots));
    })
});

strapi.io = io;
