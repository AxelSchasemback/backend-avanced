import dotenv from 'dotenv'
dotenv.config({
    path: './src/config/.env'
})

export const PORT = process.env.PORT
export const MONGODB_URL = process.env.MONGODB_URL;

export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const SECRET_CODE = process.env.SECRET_CODE;
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export const gitHubAppId = process.env.gitHubAppId;
export const gitHubClientId = process.env.gitHubClientId;
export const gitHubClientSecret = process.env.gitHubClientSecret;
export const gitHubCallBackUrl = process.env.gitHubCallBackUrl;

export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD