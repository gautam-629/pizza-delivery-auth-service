import app from "./app";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";
import { Config } from "./config";
const startServer = async () => {
    const PORT= Config.PORT
    try {
        await AppDataSource.initialize();
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
         logger.info("Database connected sucessfully");
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
