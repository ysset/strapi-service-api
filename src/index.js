'use strict';

// Create custom Promise method
const rejectSleep = (time, customReject) =>
    new Promise((_, reject) =>
        setTimeout(() => (customReject ? customReject() : reject('Time is over')), time)
    );
Promise.timeout = (promise = Promise, time, customReject) =>
    Promise.race([promise, rejectSleep(time, customReject)]);

module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({ strapi }) {
        strapi.bots = {};
    },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
    },
};
