require("dotenv").config();
const path = require("path");

const config = {
  OUTPUT_DIR: path.resolve(__dirname, "./dist"),
  INPUT_DIR: path.resolve(__dirname, "./src/client"),
  PUBLIC_DIR: path.resolve(__dirname, "./public"),
};

module.exports = (env) => {
  if (env === "hotdev" || env === "dev" || env === "prod") {
    if (env === "dev" || env === "hotdev") config.API = `http://localhost:${process.env.PORT}`;
    if (env === "prod") config.API = "https://wpark-red-tetris.herokuapp.com";

    if (env === "hotdev") return require(`./config/webpack.config.dev.js`)(config);
    if (env === "prod" || env === "dev") return require(`./config/webpack.config.prod.js`)(config);
  } else {
    console.error("Wrong webpack env. Possible choice: 'hotdev', 'dev' or 'prod'.");
  }
};
