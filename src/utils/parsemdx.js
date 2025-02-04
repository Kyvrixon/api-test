const useMDX = async (filename) => {
  let mdxData = {
    html: '',
    metadata: {}
  };

  try {
    console.log(filename)
    const response = await fetch(`/api/mdx/${filename.replace(".mdx", "")}`);

    if (response.ok) {
      mdxData = { html: data.content, metadata: data.metadata };
    } else {
      console.error('Failed to fetch MDX:', data.error);
      mdxData = { html: '<p>Error loading content.</p>', metadata: {} };
    }
  } catch (error) {
    console.error('Error fetching MDX:', error);
    mdxData = { html: '<p>Error loading content.</p>', metadata: {} };
  }

  return mdxData;
};

export default useMDX;
