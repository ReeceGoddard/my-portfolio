const config = {
    development: {
        soundBaseUrl: `http://localhost:${process.env.PORT}/public/`,
    },
    production: {
        soundBaseUrl: 'https://sensei.academy/public/',
    },
};

export default config;
