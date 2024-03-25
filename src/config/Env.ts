/**
 * Environment variables
 */
/**
 * Configuration object containing environment variables.
 */
export const config = {
    /**
     * The current environment mode.
     */
    NODE_ENV: process.env.NODE_ENV,

    /**
     * The path to the images.
     */
    IMAGE_PATH: process.env.REACT_IMAGE_PATH,

    /**
     * The base URL for the mock API.
     */
    API_BASE_MOCK_URL: process.env.REACT_APP_API_BASE_URL,

    /**
     * The base URL for the API.
     */
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,

    /**
     * Flag indicating whether the MSW (Mock Service Worker) is enabled.
     */
    MSW_ENABLED: process.env.REACT_APP_MSW_ENABLED,

    /**
     * The public URL of the application.
     */
    PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,

    /**
     * The public API key for Stripe.
     */
    STRIPE_PUBLIC_API_KEY: process.env.REACT_APP_STRIPE_PUBLIC_API_KEY,
};
