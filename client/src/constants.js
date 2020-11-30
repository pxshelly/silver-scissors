const isProduction = true;
export const SERVER_URL = isProduction ? process.env.PRODUCTION_URL : 'localhost:3000/';