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
import { Heart } from "lucide-react";
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
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] h-[90vh] bg-background text-foreground p-0 py-8">
        <div className="grid grid-cols-[1fr,320px] h-full">
          {/* Image Section */}
          <div className="relative h-full">
            <Image
              src={post.imageUrl}
              alt="Post image"
              layout="fill"
              objectFit="contain"
              className="bg-black/10"
            />
          </div>

          {/* Icon Section */}
          <div className="flex flex-col h-full border-l">
            <DialogHeader className="py-2 px-4 border-b">
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.username}`}
                    />
                    <AvatarFallback>
                      {post.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{post.username}</span>
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
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-background text-foreground"
                  >
                    <Share className="h-5 w-5" />
                    <span className="sr-only">Share post</span>
                  </Button> */}
                </div>
              </DialogTitle>
            </DialogHeader>

            {/* Prompt Section */}
            <ScrollArea className="flex-1 p-4">
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">
                Prompt
              </h3>
              <p className="text-foreground text-sm">{post.prompt}</p>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
