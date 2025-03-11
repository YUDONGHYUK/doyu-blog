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
    <div className="p-2 w-full max-w-[300px] border border-white hover:border hover:border-primary rounded-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="relative aspect-3/2 ">
        <Image src={imagePath} alt={title}  style={{objectFit:'cover'}} fill priority/>
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
