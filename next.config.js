module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://127.0.0.1:3000",
    MONGO_URI: "<YOUR MONGO_URI>",
    ACCESS_TOKEN_SECRET: "-47SUs+L?#qR?7yX$dM+fZW9dw+2AQZ+9ZNrUY4HrtuTE4Td-WU",
    REFRESH_TOKEN_SECRET:
      "!$3k&x#j52QLzF6x+H^@vPA5A-EA8c#-#_fqMWavvjX@BhrjCn3xNJzXAYjgGRP+48u_?d3L45u&*LG",
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
