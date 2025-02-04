// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import parseMDX from "../utils/parsemdx.js"; // Adjust path as needed

const Page = () => {
  const [mdxFiles, setMdxFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("<p>Loading...</p>");

  useEffect(() => {
    // Fetch MDX files
    const fetchMdxFiles = async () => {
      try {
        const rawr = await fetch("/api/mdx-files");
        const files = await rawr.json();
        setMdxFiles(files);
        if (files.length > 0) {
          setSelectedFile(files[0].fileName);
        } else {
          throw new Error("No mdx files were found")
        }
      } catch (error) {
        console.error("Error fetching MDX files:", error);
        setContent("<p>Error loading documentation.</p>");
      }
    };

    fetchMdxFiles();
  }, []);

  useEffect(() => {
    // Fetch the selected MDX file content
    const fetchMdxContent = async () => {
      if (selectedFile) {
        try {
          const { html } = await parseMDX(selectedFile);
          setContent(html);
        } catch (error) {
          console.error("Error loading MDX content:", error);
          setContent("<p>Error loading content.</p>");
        }
      }
    };

    fetchMdxContent();
  }, [selectedFile]);

  const handleFileClick = (fileName) => {
    setSelectedFile(fileName);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul id="sidebar-list">
          {Array.isArray(mdxFiles) && mdxFiles.length === 0 ? (
            <li>Loading...</li>
          ) : (
            Array.isArray(mdxFiles) && 
            mdxFiles.map((file) => (
              <li key={file.fileName}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileClick(file.fileName);
                  }}
                  className={`sidebar-item ${selectedFile === file.fileName ? "selected" : ""}`}
                >
                  {file.title || `GET /${file.fileName}`}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
  
      {/* Content Area */}
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
  
};

export default Page;
