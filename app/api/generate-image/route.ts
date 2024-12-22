import { auth, currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob/";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const imageBuffer = await response.arrayBuffer();

    if (!imageBuffer || imageBuffer.byteLength === 0) {
      throw new Error("Received empty image buffer from Modal API");
    }

    const username = user.username || user.firstName || userId;
    const filename = `${crypto.randomUUID()}_${prompt}_${username}.jpg`;
    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
      prompt,
      username,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { success: false, error: `Failed to process request: ${error}` },
      { status: 500 }
    );
  }
}
