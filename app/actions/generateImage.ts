"use server";

export async function generateImage(prompt: string) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`, // Quotes are needed
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
