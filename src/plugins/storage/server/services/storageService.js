'use strict';

module.exports = ({ strapi }) => ({
  async getAll(user) {
    //TODO реализовать запрос в бд за списком склада
    const [storage] = await strapi.entityService.findMany('plugin::storage.storage', {
      populate: '*',
      filters: {
        user: user.id
      }
    })
    
    if(storage)
      return {storage: storage.data};

    return { error: true }
  },

  async saveNewList(user, data) {
    const isSaved = await strapi.entityService.findMany('plugin::storage.storage', {
      populate: '*',
      filters: {
        user: user.id
      }
    })
    if(!isSaved || isSaved && ! isSaved.length) {
      const storage = await strapi.entityService.create('plugin::storage.storage', {
        data: {
          data: JSON.stringify(data),
          user: user
        }
      })
      .catch(console.log)
      console.log(storage);
      
      return { storage: storage.data }
    }
    return await strapi.entityService.update('plugin::storage.storage', isSaved.id,{
      data: {
        data: JSON.stringify(data)
      }
    })
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::storage.storage', id)
  }
});
