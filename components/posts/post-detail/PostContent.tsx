import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import PostHeader from './PostHeader';
import { Post } from '../../../type';
import styled from 'styled-components';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
  const syntaxTheme = oneDark;

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

    code({ node, inline, className, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, '');
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : '0';
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string = highlight.includes(applyHighlights)
            ? 'highlight'
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
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
        css={{ code: { fontSize: '1rem' } }}
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
`;

const PostImageWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  max-width: 600px;
`;
