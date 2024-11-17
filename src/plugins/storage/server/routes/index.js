module.exports = {
  sendStorageList: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/all',
        handler: 'userStorage.getAll',
        config: {},
      },
      {
        method: 'PUT',
        path: '/new',
        handler: 'userStorage.saveNewList',
        config: {},
      },
      {
        method: 'DELETE',
        path: '/:id',
        handler: 'userStorage.delete',
        config: {},
      }
    ]
  }
}