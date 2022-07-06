import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
}

export default config;