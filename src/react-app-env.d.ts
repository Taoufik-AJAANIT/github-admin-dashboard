/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        REACT_APP_GITHUB_AUTHORIZE_URL: string;
        PUBLIC_URL: string;
        REACT_APP_GITHUB_CLIENT_ID: string
        REACT_APP_GITHUB_CLIENT_SECRET: string
        REACT_APP_GITHUB_CALLBACK_URL: string
        REACT_APP_GITHUB_SCOPE: string
        REACT_APP_GITHUB_TOKEN_URL: string
        REACT_APP_GITHUB_API_BASE_URL: string

    }
}
