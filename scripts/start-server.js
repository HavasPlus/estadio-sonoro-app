const paths = require("../config/paths");

const { choosePort } = require("react-dev-utils/WebpackDevServerUtils");

const HOST = process.env.HOST || "http://localhost";

const startServer = async () => {
  const nodemon = require("nodemon");
  const fs = require("fs");
  const PORT = await choosePort("localhost", 3000);

  process.env.PORT = PORT;

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ["*"]
  });

  script.on("exit", code => {
    process.exit(code);
  });

  script.on("crash", () => {
    process.exit(1);
  });
};

startServer();
