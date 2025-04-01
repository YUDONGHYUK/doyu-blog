'use client';

import ReactMarkdown from 'react-markdown';
import { generateSlug } from '../../../../lib/generateSlug';
import { scrollToHeading } from '../../../../lib/scrollToHeading';
import rangeParser from 'parse-numeric-range';
import rehypeRaw from 'rehype-raw';
import type { Post } from '../../../../types';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import Image from 'next/image';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const syntaxTheme = dracula;

  interface Node {
    [key: string]: any;
    type: string;
    value: string;
  }

  interface PreNode {
    node: Node & { [key: string]: unknown };
    children: React.ReactElement<{ className: string }, string>[];
    position: object;
    properties: object;
    tagName: string;
    type: string;
  }

  const MarkdownComponents: object = {
    code({
      node,
      className,
      inline,
      children,
    }: {
      node: Node;
      className: string;
      inline: boolean;
      children: string | string[];
    }) {
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
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} />
      );
    },
    p: (paragraph: { children?: boolean; node?: Node }) => {
      const { node } = paragraph;

      if (node?.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className="flex justify-center mb-10">
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
              sizes="(max-width: 600px) 100vw)"
            />
          </div>
        );
      }

      return (
        <p className="text-lg leading-[2rem] mb-8">{paragraph.children}</p>
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
        <h2
          id={slug}
          className="relative mt-4 mb-8 p-0 inline-block text-3xl font-normal leading-[2.5rem]"
        >
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
    pre: (pre: PreNode) => {
      return <pre className="mt-0 mb-10 text-base" {...pre} />;
    },
    ul: (ul: {
      ordered: boolean;
      depth: number;
      children: React.ReactNode;
      node: Node;
    }) => {
      const { ordered, ...props } = ul;
      return (
        <ul
          className="px-4 mb-6 list-disc list-inside space-y-2 marker:text-gray-accent"
          {...props}
        />
      );
    },
  };

  return (
    <div>
      <ReactMarkdown
        className="[&_span[data=highlight]]:bg-code-highlight [&_span[data=highlight]]:block [&_span[data=highlight]]:mx-[-1rem] [&_span[data=highlight]]:px-[1rem]"
        components={MarkdownComponents}
        rehypePlugins={[[rehypeRaw, { passThrough: ['element'] }]]}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
}
