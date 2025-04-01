import { Metadata } from 'next';
import { getAllPosts, getPostData } from '../../../../lib/postsUtil';
import type { Post } from '../../../../types';
import ClockIcon from '../../../components/icons/clock-icon';
import { Heading } from '../../../components/ui/heading';
import PostContent from './post-content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug) as Post;
  return {
    title: post.frontMatter.title,
    description: post.frontMatter.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostDetailPage({ params }: Props) {
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
