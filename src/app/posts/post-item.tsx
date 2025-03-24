import Link from 'next/link';
import { Post } from '../../../types';
import PostCard from '../../components/post-card';

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const href = `/posts/${post.slug}`;

  return (
    <Link href={href} className="col-span-4 w-full max-w-[320px]">
      <PostCard post={post} />
    </Link>
  );
}
