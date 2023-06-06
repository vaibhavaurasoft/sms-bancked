const app = require("./app");
const dotenv = require("dotenv");
const Database = require("./config/database");
// for config file
require("dotenv").config();
dotenv.config({ path: "./config/config.env" });
// databasr connection
Database();

// server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// unhadeling error which is not hedling by anywhere
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`sutting down the server due to uncaughtException`);
  server.close(() => {
    process.exit(1);
  });
});

// unhadel promise
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`sutting down the server due to unhandele proimis rejection`);
  server.close(() => {
    process.exit(1);
  });
});
