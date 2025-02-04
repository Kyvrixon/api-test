import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = {
	get: async (req, res) => {
		try {
			const endpointsDir = path.join(
				__dirname,
				"..",
				"..",
				"html",
				"pages",
				"docs",
				"endpoints"
			);
			const files = fs.readdirSync(endpointsDir);

			const mdxFiles = files.map((file) => {
				return {
					fileName: file,
					title: file.replace(".mdx", ""),
				};
			});

			res.json(mdxFiles);
		} catch (error) {
			console.error("Error fetching MDX files:", error);
			res.status(500).send("Error loading MDX files");
		}
	},
};

export default handler;
