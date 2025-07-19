const { Server } = require('socket.io');
const events = require('./events');

const io = new Server(8080, {
    path: '/bots',
    transports: ['websocket'],
});

io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on(events.botList, async function () {
        const bots = await strapi.entityService.findMany('api::bot.bot', {
            filters: {
                isActive: true,
            },
            populate: {
                owner: true,
            },
        });
        for (const bot of bots) {
            if (bot.owner && bot.owner.id) {
                const [owner] = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
                    filters: {
                        adminUser: bot.owner.id,
                    },
                });
                bot.owner = owner;
            }
        }

        io.emit(events.botList, JSON.stringify(bots));
    });
});

strapi.io = io;
