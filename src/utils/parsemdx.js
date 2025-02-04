import fs from "fs";
import path from "path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { fileURLToPath } from "url";

// Fix __dirname issue
const __dirname = fileURLToPath(import.meta.url);
const docsPath = path.join(__dirname, "html", "pages", "docs", "endpoints");

async function parseMDX(fileName) {
	try {
		// Log the incoming fileName
		console.log(`parseMDX called with fileName: ${fileName}`);

		// Ensure fileName is correct and includes the extension
		if (!fileName.endsWith(".mdx")) {
			fileName = `${fileName}.mdx`; // Adding .mdx if not present
			console.log(`fileName did not have .mdx, appended: ${fileName}`);
		}

		const filePath = path.join(docsPath, fileName);

		// Log the constructed file path
		console.log(`Constructed filePath: ${filePath}`);

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			console.error(`File does not exist at path: ${filePath}`);
			throw new Error(`File does not exist: ${filePath}`);
		} else {
			console.log(`File found at path: ${filePath}`);
		}

		const fileContent = fs.readFileSync(filePath, "utf8");
		console.log(`File content loaded: ${fileContent.slice(0, 100)}...`); // Logging the first 100 characters of the content

		const { content, data } = matter(fileContent);

		console.log("Metadata extracted from MDX:", data);
		console.log("MDX content:", content);

		// Compile MDX content
		console.log("Compiling MDX content...");
		const compiledMDX = await compile(content, {
			outputFormat: "function-body",
		});
		console.log("MDX compilation complete");

		// Create React component and render as HTML
		const MDXContent = new Function("React", `${compiledMDX}`).bind(
			null,
			React
		);
		console.log("MDX component created");

		const htmlContent = ReactDOMServer.renderToStaticMarkup(
			React.createElement(MDXContent)
		);
		console.log("HTML content generated:", htmlContent.slice(0, 100)); // Logging the first 100 characters of the HTML

		// Returning the parsed content and metadata
		return { metadata: data, html: htmlContent };
	} catch (error) {
		console.error(`Error parsing MDX file: ${fileName}`, error);
		return { metadata: {}, html: "<p>Error loading content.</p>" };
	}
}

export default parseMDX;
