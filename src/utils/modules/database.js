import mongoose from "mongoose";
import Logger from "../logger.js";

const init = async () => {
	const dbUrl = process.env.DB_URL;
	if (!dbUrl) {
		Logger.warn(
			"Database",
			"No URL was specified. Database operations will not work!"
		);
		return;
	}

	try {
		await mongoose.connect(dbUrl);
		Logger.info("Database", "Connected");
		return;
	} catch {
		Logger.error(
			"Database",
			"Unable to connect. Maybe the URL is invalid?"
		);
		return;
	}
};

export default init;
