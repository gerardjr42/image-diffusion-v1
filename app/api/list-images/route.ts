import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();

    const posts = blobs.map((blob) => {
      const firstUnderscoreIndex = blob.pathname.indexOf("_");
      const lastUnderscoreIndex = blob.pathname.lastIndexOf("_");

      const id = blob.pathname.substring(0, firstUnderscoreIndex);
      const prompt = blob.pathname.substring(
        firstUnderscoreIndex + 1,
        lastUnderscoreIndex
      );
      const username = blob.pathname
        .substring(lastUnderscoreIndex + 1)
        .replace(".jpg", "");

      return {
        id,
        imageUrl: blob.url,
        prompt: prompt ? decodeURIComponent(prompt) : "No prompt available",
        username,
        createdAt: blob.uploadedAt,
      };
    });

    return NextResponse.json({
      success: true,
      posts: posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json(
      { success: false, error: `Failed to list images: ${error}` },
      { status: 500 }
    );
  }
}
