import dotenv from 'dotenv';
import parseArgs from 'minimist';

dotenv.config();
const args = parseArgs(process.argv.slice(2));

function getPersistenceFromArgs() {
    if (args.persistence)
        return args.persistence.toString().toUpperCase();
}

const config = {
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    PERSISTENCE: getPersistenceFromArgs(),
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    MONGO_TTL_SESSIONS: process.env.MONGO_TTL_SESSIONS,
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_MAX_AGE: Number(process.env.COOKIE_MAX_AGE),
    ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
    AUTH_TOKEN_TWILIO: process.env.AUTH_TOKEN_TWILIO,
    WHATSAPP_ADMIN_TELEPHONE_NUMBER: process.env.WHATSAPP_ADMIN_TELEPHONE_NUMBER,
    TWILIO_TELEPHONE_NUMBER: process.env.TWILIO_TELEPHONE_NUMBER,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    PASSWORD_EMAIL_SENDER: process.env.PASSWORD_EMAIL_SENDER,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL
}

export default config;