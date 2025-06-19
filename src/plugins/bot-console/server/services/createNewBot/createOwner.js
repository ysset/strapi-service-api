const emailFile = require('../../../../../emailLetter/emailFile');

const createBotOwner = async ({ firstname, lastname, email, _password, username, telegramId }) => {
    const adminUserData = {
        firstname,
        lastname,
        username,
        email,
        // password,
        roles: [3],
        blocked: false,
        // isActive: true,
    };

    const [telegramUser] = await strapi.entityService.findMany('api::telegram-user.telegram-user', {
        filters: {
            telegramId,
        },
    });

    if (!telegramUser) {
        return 'No telegram user found.';
    }

    const owner = await strapi.admin.services.user.create(adminUserData);
    if (!owner) {
        strapi.log.error(`Couldn't create author: ${email}\n ${owner}`);
        return ctx.badRequest(owner);
    }

    await strapi.entityService.update('api::telegram-user.telegram-user', telegramUser.id, {
        data: {
            adminUser: owner.id,
        },
    });

    strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
    // await strapi.mail.sendMail({
    //     from: process.env.YANDEX_SMTP_FROM,
    //     to: email,
    //     subject: "Телеграм для бизнеса",
    //     html: emailFile(email, password, null, process.env.ADMIN_URL),
    // }, (err, info) => {
    //     if (err)
    //         throw new Error(err)
    //     strapi.log.info(`to ${email} -> res: ${info.response}`)
    // })

    return {
        id: owner.id,
        email: owner.email,
        registrationLink: `${process.env.STRAPI_URL}admin/auth/register?registrationToken=${owner.registrationToken}`,
        // password,
    };
};

module.exports = {
    createBotOwner,
};
