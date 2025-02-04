import fs from "fs";
import path from "path";

export async function GET() {
  const mdxDir = path.join(process.cwd(), "src", "app", "docs");
  const files = fs.readdirSync(mdxDir).filter(file => file.endsWith(".mdx"));

  return new Response(
    JSON.stringify(files.map(file => ({
      fileName: file,
      title: file.replace('.mdx', '').replace(/-/g, ' ').toUpperCase(),
    }))),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
