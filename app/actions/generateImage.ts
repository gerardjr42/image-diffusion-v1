"use server";

import { auth } from "@clerk/nextjs/server";

export async function generateImage(prompt: string) {
  try {
    const session = await auth();
    const token = await session.getToken();

    const response = await fetch("http://localhost:3000/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("API Response:", text);
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to generate image");
    }

    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
