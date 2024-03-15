const emailFile = require("../../../../../emailLetter/emailFile");

const createBotOwner = async ({firstname, lastname, email, password}) => {
    const adminUserData = {
        firstname,
        lastname,
        email,
        password,
        roles: [3],
        blocked: false,
        isActive: true,
    };

    const owner = await strapi.admin.services.user.create(adminUserData);
    if (!owner) {
        strapi.log.error(`Couldn't create author: ${email}\n ${owner}`);
        return ctx.badRequest(owner);
    }
    //TODO каким-то магическим способом создавать ссылку на оплату и брать оплату
    const payUrl = ''

    strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
    await strapi.mail.sendMail({
        from: process.env.YANDEX_SMTP_FROM,
        to: email,
        subject: "Телеграм для бизнеса",
        html: emailFile(email, password, payUrl, process.env.ADMIN_URL)
    }, (err, info) => {
        if (err)
            throw new Error(err)
        strapi.log.info(`to ${email} -> res: ${info.response}`)
    })

    return owner;
}

module.exports = {
    createBotOwner
}
