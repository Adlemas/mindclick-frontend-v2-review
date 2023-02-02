// eslint-disable-next-line import/no-extraneous-dependencies
const AntdMomentWebpackPlugin = require("@ant-design/moment-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.plugins = [...config.plugins, new AntdMomentWebpackPlugin()];
    return config;
  },
};

module.exports = nextConfig;
