import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import PostHeader from './PostHeader';
import { Post } from '../../../types';
import styled from 'styled-components';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const syntaxTheme = dracula;

  const MarkdownComponents: object = {
    p: (paragraph: { children?: boolean; node?: any }) => {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <PostImageWrapper>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </PostImageWrapper>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code({ node, inline, className, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  const imagePath = `/images/posts/${post.slug}/${post.frontMatter.image}`;

  return (
    <Article>
      <PostHeader title={post.frontMatter.title} image={imagePath} />
      <ReactMarkdown
        components={MarkdownComponents}
        className="codeStyle"
        rehypePlugins={[[rehypeRaw, { passThrough: ['element'] }]]}
      >
        {post.content}
      </ReactMarkdown>
    </Article>
  );
};

export default PostContent;

const Article = styled.article`
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;

  .codeStyle {
    pre code {
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;

const PostImageWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  max-width: 600px;
`;
