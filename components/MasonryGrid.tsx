'use client'

import { Post } from '../types'
import PostCard from './PostCard'

interface MasonryGridProps {
  posts: Post[]
  onExpand: (post: Post) => void
}

export default function MasonryGrid({ posts, onExpand }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="break-inside-avoid mb-4">
          <PostCard post={post} onExpand={onExpand} />
        </div>
      ))}
    </div>
  )
}

