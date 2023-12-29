/**
 * Environment variables
 */
export const config = {
    NODE_ENV: process.env.NODE_ENV,
    IMAGE_PATH: process.env.REACT_IMAGE_PATH,
    API_BASE_MOCK_URL: process.env.REACT_APP_API_BASE_URL,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    MSW_ENABLED: process.env.REACT_APP_MSW_ENABLED,

    isProd() {
        return this.NODE_ENV === 'production';
    },
    isDev() {
        return this.NODE_ENV === 'development';
    },
    isTest() {
        return this.NODE_ENV === 'test';
    },
    isMswEnabled() {
        return this.MSW_ENABLED === 'true';
    },
};
