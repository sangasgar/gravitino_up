export default () => ({
   refresh_token: process.env.REFRESH_SECRET,
   access_secret: process.env.ACCESS_SECRET,
   port: process.env.PORT,
   dialect: process.env.DIALECT,
   db_host: process.env.DB_HOST,
   db_port: process.env.DB_PORT,
   db_username: process.env.DB_USERNAME,
   db_password: process.env.DB_PASSWORD,
   db_name: process.env.DB_NAME,
})
