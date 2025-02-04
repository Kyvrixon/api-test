import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function GET(req, {params}) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Path to the directory where MDX files are stored
    const mdxDirectory = path.join(__dirname, "src", "app", "docs");
    console.log(mdxDirectory)
    const filePath = path.join(mdxDirectory, `${filename}`); // Construct full file path
    console.log(filePath)

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the file content
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            // Send the content as a response
            res.status(200).json({
                success: true,
                content: fileContent,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
