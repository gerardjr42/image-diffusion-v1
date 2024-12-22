"use client";

import { usePosts } from "@/context/PostContext";
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
      <PostForm />
      <MasonryGrid posts={posts} onExpand={handleExpand} />
      <PostModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={handleCloseModal}
      />
    </div>
  );
}
