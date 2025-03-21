import Image from 'next/image';
import { Post } from '../../types';
import { Heading } from './ui/heading';
import { format, parse } from 'date-fns';

export default function PostCard({ post }: { post: Post }) {
  const {
    slug,
    frontMatter: { image, title, date, categories = ['blog'] },
  } = post;

  const imagePath = `/images/posts/${slug}/${image}`;
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

  return (
    <div className="group w-full max-w-[300px] border border-bg">
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
        <div className="mt-4">
          {categories?.map((category) => (
            <span className="text-primary font-sm" key={category}>
              {category}
            </span>
          ))}
        </div>
        <Heading
          as="h4"
          className="break-words line-clamp-2 mt-4 min-h-16"
          title={title}
        >
          {title}
        </Heading>
        <p className="mt-4 text-gray-accent text-sm">
          {format(parsedDate, 'yyyy.MM.dd')}
        </p>
      </div>
    </div>
  );
}
