module.exports = {
    WELCOME: 'Welcome to Xatta Bot!',
    GET_USERNAME: 'Please submit a name that will be visible to users',
    GET_USER_EMAIL: 'Please enter your email',
    COMPLETE_ADMIN_REGISTRATION: (registrationToken) =>
        `You now have access to the xatta admin panel.\nhttp://xatta.ru/admin/auth/register?registrationToken=${registrationToken} \n Please proceed with registration by clicking on this link`,
};
