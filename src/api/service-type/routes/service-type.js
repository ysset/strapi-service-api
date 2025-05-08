'use strict';

/**
 * service-type router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-types/:id/:botId',
      handler: 'service-type.getServices'
    },
    {
      method: 'GET',
      path: '/service-types/:botId',
      handler: 'service-type.getServices'
    }
  ]
}
