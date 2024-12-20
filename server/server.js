const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const setupSocket = require("./socketServer");
require("./controllers/cronJobs/notCompletedLog");
require("./controllers/cronJobs/expiredSubscriptions");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
