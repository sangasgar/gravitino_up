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

   rp_permission_create: process.env.RP_PERMISSION_CREATE,
   rp_permission_update: process.env.RP_PERMISSION_UPDATE,
   rp_permission_delete: process.env.RP_PERMISSION_DELETE,

   rp_role_permission_create: process.env.RP_ROLE_PERMISSION_CREATE,
   rp_role_permission_update: process.env.RP_ROLE_PERMISSION_UPDATE,
   rp_role_permission_delete: process.env.RP_ROLE_PERMISSION_DELETE,
})
