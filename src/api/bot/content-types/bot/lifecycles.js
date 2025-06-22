const events = require('../../../../websocket/events');

module.exports = {
    afterCreate(event) {
        const { result } = event;
        strapi.io.emit(
            events.newBot,
            JSON.stringify({
                id: result.id,
                name: result.name,
                token: result.token,
                type: result.type,
                language: result.language,
                paymentToken: result.paymentToken,
                isActive: result.isActive,
            }),
        );
    },
    afterUpdate(event) {
        const { result } = event;
        console.log(result);
        strapi.io.emit(
            events.updateBot,
            JSON.stringify({
                id: result.id,
                name: result.name,
                token: result.token,
                type: result.type,
                language: result.language,
                paymentToken: result.paymentToken,
                isActive: result.isActive,
            }),
        );
    },
};
