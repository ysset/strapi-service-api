import { request } from '@strapi/helper-plugin'

const storageListRequest = {
    getList: async () => {
        const res = await request('/storage/all', {
            method: "GET"
        })
        
        if (res.storage)
            return res.storage
        return [null]
    },
    saveNewList: async (data) => {
        const res = await request('/storage/new', {
            method: "PUT",
            body: data
        })
        .then((res) => {
            console.log(res);
        })
        .catch(console.log)
        return [null]
    },
}

export {
    storageListRequest
}