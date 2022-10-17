const beautifyParams = (params) => {
    for (let param in params) {
        if (params[param] === null || !params[param]) params[param] = 'неизвестно';
    }
    return params;
};

module.exports = beautifyParams;
