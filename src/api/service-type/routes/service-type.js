'use strict';

/**
 * service-type router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-types/:id/:type/:botId',
      handler: 'service-type.getServices'
    },
    {
      method: 'GET',
      path: '/service-types/:botId/:type',
      handler: 'service-type.getServices'
    },
    {
      method: 'GET',
      path: '/service-types/:botId',
      handler: 'service-type.getServices'
    }
  ]
}
