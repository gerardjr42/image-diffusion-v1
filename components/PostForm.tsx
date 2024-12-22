"use client";

import { generateImage } from "@/app/actions/generateImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { useState } from "react";
import { usePosts } from "../context/PostContext";

export default function PostForm() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addPost } = usePosts();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setIsLoading(true);

    try {
      const data = await generateImage(prompt);

      if (data?.success) {
        addPost({
          id: Date.now().toString(),
          imageUrl: data.imageUrl,
          prompt,
          username: user?.username || "guest",
        });
        setPrompt("");
      } else {
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter prompt to generate an image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full pl-4 pr-12 py-6 text-lg bg-background text-foreground"
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <Search className="h-5 w-5" />
          )}
          <span className="sr-only">Generate image</span>
        </Button>
      </div>
    </form>
  );
}
