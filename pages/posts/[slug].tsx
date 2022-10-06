import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import PostContent from '../../components/posts/post-detail/PostContent';
import TableOfContents from '../../components/posts/post-detail/TableOfContents';
import { Post } from '../../types/index';
import { getPostData, getPostFiles } from '../../lib/postsUtil';
import { useIntersectionObserver } from '../../lib/useintersectionObserver';

type PostDetailPageProps = {
  post: Post;
};

const PostDetailPage = ({ post }: PostDetailPageProps) => {
  const [headingList, setHeadingList] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useIntersectionObserver(setActiveId);

  return (
    <>
      <PostContent post={post} setHeadingList={setHeadingList} />
      <TableOfContents headingList={headingList} activeId={activeId} />
    </>
  );
};

export default PostDetailPage;

interface Iparams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;

  const postData = getPostData(slug);

  if (!postData) {
    return { notFound: true };
  }

  return {
    props: { post: postData },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};
