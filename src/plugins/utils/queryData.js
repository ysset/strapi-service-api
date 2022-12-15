module.exports = {
    getQuery: ({ action, table, flatId }) => {
        if (!action) throw strapi.log.err('action is required');

        const query = [action, table || '', flatId || ''].join('/');
        return query;
    },
    parseQuery: (query) => {
        if (!query) throw strapi.log.err('query is required');
        const [action, table, flatId] = query.split('/');
        return {
            action,
            table,
            flatId,
        };
    },
};
