import Logger from "../../utils/logger.js";

const handler = {
	get: async (req, res, serverData) => {
		try {
			Logger.debug(
				"GET Request",
				`Received GET request for ${req.originalUrl}`
			);

			res.set("content-type", "application/json");
			res.status(200).send(JSON.stringify(serverData, null, 2));
		} catch (error) {
			Logger.error(
				"GET Request",
				"An error occurred while processing the GET request",
				error
			);
			res.status(500).send("Internal Server Error");
		}
	},
};

export default handler;
