module.exports = {
    APP_PORT: process.env.PORT || 3000,
    APP_DB: process.env.DB || 'mongodb://localhost:27017/mavenDB',
    APP_HASH: process.env.HASH,
    APP_SENDGRID_KEY: process.env.SENDGRID_API_KEY,
    APP_CURRENT_URL_FRONTEND: 'http://localhost:4200',
    APP_ORGANIZATION_EMAIL: process.env.ORGANIZATION_EMAIL
}