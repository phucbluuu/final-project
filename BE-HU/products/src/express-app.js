const express = require("express");
const cors = require("cors");
const path = require("path");
const { products, appEvents } = require("./api");
const cookieParser = require("cookie-parser");

const { CreateChannel } = require("./utils");

global.__basedir = __dirname;

module.exports = async (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["*"],
      credentials: true,
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use("/statics", express.static(path.join(__dirname, "statics")));
  app.use(cookieParser());
  app.use(express.json({ urlEncoded: true }));
  app.use(express.urlencoded({ extended: false }));
  //api
  // appEvents(app);

  const channel = await CreateChannel();
  products(app, channel);

  // error handling
};
