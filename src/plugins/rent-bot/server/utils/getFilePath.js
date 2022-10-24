const path = require('path');
/**
 * @param object
 * @returns {String}
 */
module.exports = (object) => {
    const url =
        object.layoutPhoto[0].size > 500
            ? object.layoutPhoto[0].formats.large.url
            : object.layoutPhoto[0].size > 1000
            ? object.layoutPhoto[0].formats.medium.url
            : object.layoutPhoto[0].url;
    let resolvedPath = path.resolve('./index');
    resolvedPath = resolvedPath.split('/');
    resolvedPath.pop();
    resolvedPath = resolvedPath.join('/');
    resolvedPath += `/public${url}`;
    return resolvedPath;
};
