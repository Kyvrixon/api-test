async function loadEndpointContent(fileName) {
	const contentArea = document.querySelector('.content');
	contentArea.innerHTML = '<p>Loading...</p>';

	try {
		const response = await fetch(`/api/parse-mdx/${fileName}`);
		const { html } = await response.json();
		contentArea.innerHTML = html;
	} catch (error) {
		console.error('Error loading MDX content:', error);
		contentArea.innerHTML = '<p>Error loading content.</p>';
	}
}

const response = await fetch("/api/mdx-files");

const abc = await response.json();

	for (const name in abc) {
		loadEndpointContent(name);
	}

export default loadEndpointContent;