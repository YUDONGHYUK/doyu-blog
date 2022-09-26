import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import PostContent from '../../components/posts/post-detail/PostContent';
import { Post } from '../../type/index';
import { getPostData, getPostFiles } from '../../lib/posts-util';

type PostDetailPageProps = {
  post: Post;
};

const PostDetailPage = ({ post }: PostDetailPageProps) => {
  return <PostContent post={post} />;
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
    fallback: false,
  };
};
