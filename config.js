import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    MONGO_TTL_SESSIONS: process.env.MONGO_TTL_SESSIONS,
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_MAX_AGE: Number(process.env.COOKIE_MAX_AGE)
}

export default config;