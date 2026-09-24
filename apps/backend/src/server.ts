import http from "http";
import { app } from "./app";
import { ENV } from "./config/env";
import { testDBConnection } from "./database/test";
import "./database/init";

const startServer = async () => {
  try {
    await testDBConnection();

    const server = http.createServer(app);

    server.on("error", (error) => {
      console.error("Server encountered an error:", error);
      process.exit(1);
    });

    server.listen(ENV.PORT, () => {
      console.log(`Server listening on port: ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
