'use strict';

/**
 * service-type router
 */

module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/telegram-user/:id',
            handler: 'telegram-user.getUser'
        },
        {
            method: 'POST',
            path: '/telegram-user',
            handler: 'telegram-user.createUser'
        },
    ]
}
