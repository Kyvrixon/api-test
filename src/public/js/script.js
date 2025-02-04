/* eslint-disable no-undef */

import parseMDX from "../../utils/parsemdx.js";

// Function to fetch MDX files from the server
export async function fetchMDXFiles() {
	const contentArea = document.querySelector(".content");
	try {
		const response = await fetch("/api/mdx-files", {
			method: "GET",
		});
		const mdxFiles = await response.json();
		console.log(mdxFiles);
		populateSidebar(mdxFiles);
	} catch (error) {
		console.error("Error fetching MDX files:", error);
		contentArea.innerHTML = "<p>Error loading documentation.</p>";
	}
}

// Function to populate the sidebar with MDX file links
export function populateSidebar(mdxFiles) {
	const sidebarList = document.getElementById("sidebar-list");
	sidebarList.innerHTML = ""; // Clear previous sidebar content

	mdxFiles.forEach(({ fileName, title }) => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = "#";
		a.textContent = title || `GET /${fileName}`;
		a.classList.add("sidebar-item");
		a.dataset.endpoint = fileName;

		li.appendChild(a);
		sidebarList.appendChild(li);

		// Click event to load MDX content
		a.addEventListener("click", async (event) => {
			event.preventDefault();

			// Remove 'selected' class from all items
			document
				.querySelectorAll(".sidebar-item")
				.forEach((item) => item.classList.remove("selected"));
			a.classList.add("selected");

			// Load and display the selected MDX file
			loadEndpointContent(fileName);
		});
	});

	// Load the first MDX file by default
	if (mdxFiles.length > 0) {
		loadEndpointContent(mdxFiles[0].fileName);
		document.querySelector(".sidebar-item")?.classList.add("selected");
	}
}

// Function to load and render MDX content
export async function loadEndpointContent(fileName) {
	const contentArea = document.querySelector(".content");
	contentArea.innerHTML = "<p>Loading...</p>"; // Show loading message

	try {
		const { html } = await parseMDX(fileName);
		contentArea.innerHTML = html; // Inject parsed MDX content
	} catch (error) {
		console.error("Error loading MDX content:", error);
		contentArea.innerHTML = "<p>Error loading content.</p>";
	}
}

console.log("triggered");
fetchMDXFiles();
