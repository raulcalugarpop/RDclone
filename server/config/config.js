module.exports = {
	database: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	jwt: {
        secret: process.env.JWT_SECRET_KEY
    }
};