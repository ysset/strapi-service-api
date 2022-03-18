module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '76c4082e307fe7bf7de840f58132fe08'),
  },
});
