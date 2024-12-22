import Feed from "@/components/Feed";
import { PostProvider } from "@/context/PostContext";

export default function FeedPage() {
  return (
    <PostProvider>
      <main className="min-h-screen py-4">
        <Feed />
      </main>
    </PostProvider>
  );
}
