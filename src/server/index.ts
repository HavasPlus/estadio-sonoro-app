// import React from 'react';
import path from "path";
import * as express from "express";
import cors from "cors";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import bodyParser from "body-parser";

import paths from "../../config/paths";
import errorHandler from "./middleware/error-handler";
import serverRenderer from "./middleware/server-renderer";
import { moduleFetcher } from "./middleware/initial-store-handler";
import { addStore } from "./middleware/store-handler";
const https = require("https");
const fs = require("fs");

require("dotenv").config();

const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === "development") {
app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
// }

app.use(cors());

// Middleware requires to handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add Redux store
app.use(addStore);

// Add manifest to the requests
const manifestPath = path.join(paths.clientBuild, paths.publicPath);
app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`
  })
);

// Get Pages from API and add them to the store.
// If you want to fetch more data, do it in this middleware.
app.use(moduleFetcher());

// Set mobile state in redux state for initial margin purposes
// app.use(setIsMobile());

// Render the HTML and sent it to the server.
app.use(serverRenderer());

// Deal with errors
app.use(errorHandler);

// Let the world know we're up and running

var env = process.env.NODE_ENV || "dev";
app.listen(process.env.PORT || 3000, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`Application is running: http://localhost:${process.env.PORT || 3000}`)
    );
});
/*
if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `[${new Date().toISOString()}]`,
      chalk.blue(`Application is running: http://localhost:${process.env.PORT || 3000}`)
    );
  });
} else if (process.env.NODE_ENV === "production") {
  // app.listen(process.env.PORT || 3000, () => {
  //   console.log(
  //     `[${new Date().toISOString()}]`,
  //     chalk.blue(`Application is running: http://localhost:${process.env.PORT || 3000}`)
  //   );
  // });
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert")
      },
      app
    )
    .listen(3000, () => {
      console.log(chalk.blue(`Application is running: https://localhost:${process.env.PORT || 3000}`));
    });
}
*/
export default app;
