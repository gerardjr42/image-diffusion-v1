import { put } from "@vercel/blob/";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Call Modal API
    const response = await fetch(process.env.API_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Modal API request failed: ${response.statusText}`);
    }

    // Get image buffer from Modal
    const imageBuffer = await response.arrayBuffer();

    if (!imageBuffer || imageBuffer.byteLength === 0) {
      throw new Error("Received empty image buffer from Modal API");
    }

    // Store in Vercel Blob
    const filename = `${crypto.randomUUID()}.jpg`;
    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { success: false, error: `Failed to process request: ${error}` },
      { status: 500 }
    );
  }
}
