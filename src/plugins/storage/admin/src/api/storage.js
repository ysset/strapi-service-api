import { request } from '@strapi/helper-plugin'

const storageListRequet = {
    getList: async () => {
        return await request('/storage/all')
    }
}

export {
    storageListRequet
}