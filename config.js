const env = process.env;

export default {
  admin: {
    password: env.ADMIN_PASSWORD || 'password'
  },
  session: {
    password: env.SESSION_PASSWORD || 'password'
  },
  pagination: {
    pagesize: env.PAGINATION_PAGESIZE || 10
  }
};