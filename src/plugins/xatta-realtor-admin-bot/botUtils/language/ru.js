module.exports = {
    WELCOME: 'Xatta admin bot готов к работе!',
    GET_USERNAME: 'Пожалуйста отправьте имя которое будут видеть ваши клиенты',
    GET_USER_EMAIL: 'Пожалуйста отправьте свой email',
    COMPLETE_ADMIN_REGISTRATION: (registrationToken) =>
        `Теперь у вас есть доступ к xatta админке.\nhttp://xatta.ru/admin/auth/register?registrationToken=${registrationToken} \n Пожалуйста, продолжите регистрацию перейдя по этой ссылке.`,
};
