"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onExpand: (post: Post) => void;
}

export default function PostCard({ post, onExpand }: PostCardProps) {
  return (
    <Card className="w-full overflow-hidden bg-background">
      <CardContent className="p-0">
        <div
          className="relative aspect-square cursor-pointer"
          onClick={() => onExpand(post)}
        >
          <Image
            src={post.imageUrl}
            alt="Generated image"
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105"
          />
        </div>
      </CardContent>
    </Card>
  );
}
