import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import PostContent from '../../components/posts/post-detail/PostContent';
import TableOfContents from '../../components/posts/post-detail/TableOfContents';
import { Post } from '../../types/index';
import { getPostData, getPostFiles } from '../../lib/postsUtil';
import { useIntersectionObserver } from '../../lib/useintersectionObserver';
import useTOC from '../../hooks/ussTOC';

type PostDetailPageProps = {
  post: Post;
};

const PostDetailPage = ({ post }: PostDetailPageProps) => {
  const { tocList } = useTOC();
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useIntersectionObserver(setActiveHeading);

  return (
    <>
      <PostContent post={post} />
      <TableOfContents tocList={tocList} activeHeading={activeHeading} />
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
