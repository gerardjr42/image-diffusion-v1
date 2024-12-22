"use client";

import { usePosts } from "@/context/PostContext";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { Post } from "../types";
import MasonryGrid from "./MasonryGrid";
import PostForm from "./PostForm";
import PostModal from "./PostModal";

export default function Feed() {
  const { posts } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleExpand = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="fixed top-6 right-8 z-50">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="max-w-4xl mx-auto mb-8">
        <PostForm />
      </div>
      <MasonryGrid posts={posts} onExpand={handleExpand} />
      <PostModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={handleCloseModal}
      />
    </div>
  );
}
