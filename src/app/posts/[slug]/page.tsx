import { getPostData } from '../../../../lib/postsUtil';
import type { Post } from '../../../../types';
import { Heading } from '../../../components/ui/heading';
import ClockIcon from '../../../components/ui/icon/clock-icon';
import PostContent from './post-content';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug) as Post;
  const {
    frontMatter: { title, excerpt, date },
  } = post;

  return (
    <div>
      <article>
        <Heading as="h1" className="mt-16 mb-4 font-normal">
          {title}
        </Heading>
        <p className="text-lg mb-8 text-gray-accent">{excerpt}</p>
        <div className="text-gray-accent flex items-center gap-1">
          <ClockIcon size={16} />
          <time>{date}</time>
        </div>

        <PostContent post={post} />
      </article>
    </div>
  );
}
