export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5001,
  db_url_local: process.env.DB_URL_LOCAL,
  db_url_atlas: process.env.DB_URL_ATLAS,
};
