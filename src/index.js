import { configDotenv } from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Logger from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

let serverData = {};

const updateCounters = () => {
	try {
		const data = JSON.parse(fs.readFileSync("./metadata.json", "utf8"));
		data.counters = { request: (data.counters?.request || 0) + 1 };

		data.meta = {
			time: {
				up: Math.floor(process.uptime()) + "s",
				clock: new Date().toLocaleTimeString("en-GB", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}),
				date: new Date().toLocaleDateString("en-GB", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
				}),
			},
			version: "0.0.0-dev",
			memUsage:
				(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
				"MB",
		};

		fs.writeFileSync(
			"./metadata.json",
			JSON.stringify(data, null, 2),
			"utf8"
		);
		Logger.debug("Request count updated successfully");
		serverData = data;
		return;
	} catch (error) {
		serverData = {
			err: "error getting data",
		};
		Logger.error("Error updating request count:", error.message);
	}
};

(async () => {
	// Load Database
	const dbModule = await import(
		"file://" + path.join(__dirname, "utils", "modules", "database.js")
	);
	await dbModule.default();

	app.use("/api/:path", async (req, res) => {
		const endpointName = req.params.path;
		const filePath = path.join(__dirname, "api", endpointName);

		if (fs.existsSync(filePath)) {
			updateCounters();
			const endpoint = await import("file://" + filePath + "/route.js");
			if (req.method.toLowerCase() in endpoint.default) {
				try {
					return await endpoint.default[req.method.toLowerCase()](
						req,
						res,
						serverData
					);
				} catch (error) {
					console.error(error);
				}
			} else {
				return res.status(405).send("Method Not Allowed");
			}
		}
		return res.status(404).send("Endpoint not found");
	});

	app.use("/", (req, res) => {
		if (req.path === "/") {
			return res
				.status(200)
				.sendFile(path.join(__dirname, "public", "docs.html"));
		}
	});

	app.listen(port, () =>
		Logger.success("Server", `Server is alive on port ${port}`)
	);
})();
