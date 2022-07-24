module.exports = {
    WELCOME: '欢迎来到 Xatta Bot!',
    GET_USERNAME: '请发送您的客户会看到的英文名称',
    GET_USER_EMAIL: '请发送您的电子邮件',
    COMPLETE_ADMIN_REGISTRATION: (registrationToken) =>
        `您现在可以访问 xatta 管理面板。\nhttp://xatta.ru//admin/auth/register?registrationToken=${registrationToken} \n 请单击此链接继续您的注册`,
};
