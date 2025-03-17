import Image from 'next/image';
import { Post } from '../../types';
import { Heading } from './ui/heading';

export default function PostCard({ post }: { post: Post }) {
  const {
    slug,
    frontMatter: { image, title, excerpt },
  } = post;

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <div className="group w-full max-w-[300px] border border-white">
      <div className="relative aspect-3/2 overflow-hidden rounded-md group-hover:ring-2 group-hover:ring-primary">
        <Image
          src={imagePath}
          alt={title}
          style={{ objectFit: 'cover' }}
          fill
          priority
        />
      </div>
      <div>
        <Heading
          as="h5"
          className="break-words line-clamp-2 mt-4"
          title={title}
        >
          {title}
        </Heading>
        <p className="text-base line-clamp-2 font-light mt-2">{excerpt}</p>
      </div>
    </div>
  );
}
