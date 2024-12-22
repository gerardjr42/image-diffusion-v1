"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        <div className="p-3 flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.username}`}
            />
            <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-foreground">
            {post.username}
          </span>
        </div>
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
