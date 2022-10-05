import { useEffect, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { generateSlug } from '../../../lib/generateSlug';
import { scrollToHeading } from '../../../lib/scrollToHeading';

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
  setHeadingList: Dispatch<SetStateAction<string[]>>;
};

const PostContent = ({ post, setHeadingList }: PostContentProps) => {
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
          <a {...props} onClick={() => scrollToHeading(slug)} />
        </h2>
      );
    },
  };

  const imagePath = `/images/posts/${post.slug}/${post.frontMatter.image}`;

  useEffect(() => {
    const headings = [];
    const h2 = document.querySelectorAll('h2');

    for (let i = 0; i < h2.length; i++) {
      headings.push(h2[i].innerText);
    }

    setHeadingList(headings);
  }, []);

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
  }
`;

const PostImageWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  max-width: 600px;
`;
