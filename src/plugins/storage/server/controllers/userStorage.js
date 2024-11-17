'use strict';

module.exports = ({ strapi }) => ({
  getAll(ctx) {
    const user = ctx.state.user
    return strapi
      .plugin('storage')
      .service('storageService')
      .getAll(user);
  },
  saveNewList(ctx) {
    const user = ctx.state.user;
    const data = ctx.request.body;
    return strapi
      .plugin('storage')
      .service('storageService')
      .saveNewList(user, data);
  },
  delete(ctx) {
    const id = ctx.params.id;
    return strapi
      .plugin('storage')
      .service('storageService')
      .delete(id);
  },
});
