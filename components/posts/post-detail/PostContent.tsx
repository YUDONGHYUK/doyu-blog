import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { generateSlug } from '../../../lib/generateSlug';
import { scrollToHeading } from '../../../lib/scrollToHeading';
import rangeParser from 'parse-numeric-range';

import PostHeader from './PostHeader';
import { Post } from '../../../types';
import styled from 'styled-components';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

type PostContentProps = {
  post: Post;
  // setHeadingList: Dispatch<SetStateAction<string[]>>;
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

      const applyHighlights: object = (lineNumber: number) => {
        if (hasMeta) {
          const highlightNum = node.data.meta?.replace(/\s/g, '');
          const highlightNumArr = rangeParser(highlightNum);
          const data: string | null = highlightNumArr.includes(lineNumber)
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

    h2: (props: any) => {
      const arr = props.children;
      let heading = '';

      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.type !== undefined) {
          for (let j = 0; j < arr[i].props.children.length; j++) {
            heading += arr[i]?.props?.children[0];
          }
        } else heading += arr[i];
      }

      const slug = generateSlug(heading);

      return (
        <h2 id={slug}>
          <a
            {...props}
            href={`#${slug}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToHeading(slug);
            }}
          />
        </h2>
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
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-top: 1.5rem;

  .codeStyle {
    pre code {
      float: left;
      min-width: 100%;
      font-size: 1rem;
      font-weight: 500;
    }

    h2 {
      a {
        cursor: pointer;
        text-decoration: none;
      }
    }

    a {
      text-decoration: underline ${({ theme }) => theme.primary};

      &:hover {
        color: ${({ theme }) => theme.primary};
      }
    }

    blockquote {
      margin: 0;
      padding: 0 2rem;
      border-left: 6px solid ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.text2};
      font-style: italic;

      a {
        text-decoration: none;
      }
    }

    span[data='highlight'] {
      display: block;
      margin: 0 -1rem;
      padding: 0 1rem;
      background-color: ${({ theme }) => theme.code_highlight};
    }
  }
`;

const PostImageWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  max-width: 600px;
`;
