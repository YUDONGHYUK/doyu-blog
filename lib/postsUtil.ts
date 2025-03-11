import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const NUM_OF_LATEST_POSTS = 3;
const postDirectory = path.join(process.cwd(), 'posts');

export function getPostFiles() {
  return fs.readdirSync(postDirectory);
}

export function getPostData(fileIdentifier: string) {
  const postSlug = fileIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return { slug: postSlug, frontMatter: data, content };
}

export function getAllPosts() {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map((postFile) => getPostData(postFile)) as Post[];
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.frontMatter.date > postB.frontMatter.date ? -1 : 1
  );

  return sortedPosts;
}

export function getLatestPosts(): Post[] {
  const latestPosts = getAllPosts().slice(0, NUM_OF_LATEST_POSTS);

  return latestPosts;
}
