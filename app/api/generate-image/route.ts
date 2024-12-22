import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const url = new URL(
      "https://flexiformat1--example-flux-generate-image.modal.run/"
    );

    url.searchParams.set("prompt", prompt);

    console.log("Sending request to", url.toString());

    return NextResponse.json({
      success: true,
      message: `Recieved prompt: ${prompt}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to process request: ${error}` },
      { status: 500 }
    );
  }
}
