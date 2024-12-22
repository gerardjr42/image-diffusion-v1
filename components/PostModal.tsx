"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { Heart, Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Post } from "../types";

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ post, isOpen, onClose }: PostModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUser();
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${
                    user?.username || "guest"
                  }`}
                />
                <AvatarFallback>{user?.username?.[0] || "G"}</AvatarFallback>
              </Avatar>
              <span>{user?.username || "Guest"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className="hover:bg-background text-foreground"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span className="sr-only">Like post</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-background text-foreground"
              >
                <Share className="h-5 w-5" />
                <span className="sr-only">Share post</span>
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="relative aspect-square">
            <Image
              src={post.imageUrl}
              alt="Post image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <ScrollArea className="h-full">
            <h3 className="font-semibold mb-2">Prompt:</h3>
            <p className="text-foreground">{post.prompt}</p>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
