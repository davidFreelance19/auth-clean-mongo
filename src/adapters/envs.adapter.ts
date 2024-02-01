import 'dotenv/config';
import { get } from "env-var"
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    
    MONGO_URL: get('MONGO_URL').required().asString(),
    DB_NAME: get('DB_NAME').required().asString(),

    EMAIL_USER: get('EMAIL_USER').required().asString(),
    EMAIL_PASS: get('EMAIL_PASS').required().asString(),
    EMAIL_HOST: get('EMAIL_HOST').required().asString(),
    EMAIL_PORT: get('EMAIL_PORT').required().asPortNumber(),

    BACKEND_URL: get('BACKEND_URL').required().asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),
}