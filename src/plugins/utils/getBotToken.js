module.exports = (env) => {
    const keys = Object.keys(process.env).filter((el) => el.includes(env));
    const tokens = keys.map((el) => process.env[el]);
    let languages = {};
    keys.forEach((key) => {
        languages[process.env[key]] = key.split('_')[key.split('_').length - 1];
    });

    return {
        tokens,
        languages,
    };
};
