import axios from 'axios'

const storageListRequet = {
    getList: async () => {
        const res = await axios.get('/storage/all')
        if (res.data.length)
            return res.data
        return [null]
    }
}

export {
    storageListRequet
}