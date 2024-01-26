const { v4: uuidv4 } = require('uuid');
const Email = require('email-templates');

module.exports = {
   routes: [
      {
         method: 'POST',
         path: '/create-author',
         handler: async (ctx) => {
            try {
               const { firstname, lastname, email } = ctx.request.body;
               const password = uuidv4();
               if (!firstname || !lastname || !email || !password) {
                  // ctx.badRequest(message, details)
                  return ctx.badRequest(`firstname, lastname, email and password are required fields`);
               }

               const user = await strapi.db.query("admin::user").findOne({ where: { email: email } });
               if (user) {
                  strapi.log.error(`Couldn't create author: ${email} already exists`);
                  return ctx.badRequest(`${email} already exists`)
               }

               const hashedPassword = await strapi.service("admin::auth").hashPassword(password);
               const authorRole = await strapi.db.query("admin::role").findOne({ where: { code: 'strapi-author' } })
               const adminUserData = {
                  firstname,
                  lastname,
                  email,
                  password: hashedPassword,
                  roles: [authorRole],
                  blocked: false,
                  isActive: true,
               }

               const response = await strapi.db.query("admin::user").create({ data: { ...adminUserData } });

               strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
               const mailer = new Email({
                  message: {
                     from: 'telegram_for_business@gmail.com',
                     attachments: [
                        {
                           raw: "hello"
                        }
                     ]
                  },
                  // uncomment below to send emails in development/test env:
                  // send: true
                  transport: {
                     jsonTransport: true
                  }
               });
               mailer
                 .send({
                    template: 'mars',
                    message: {
                       to: 'kamdenech@gmail.com'
                    }
                 })
                 .then(console.log)
                 .catch(console.error);
               return ctx.send({ message: 'Author created successfully!', details: response }, 200);
            } catch (err) {
               return ctx.internalServerError(err.message)
            }
         },
      }
   ]
}
