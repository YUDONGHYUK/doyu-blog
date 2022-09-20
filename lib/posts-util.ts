import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NUM_OF_LATEST_POSTS = 4;
const postDirectory = path.join(process.cwd(), 'posts');

function getPostData(fileName: string) {
  const filePath = path.join(postDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');

  return { slug: postSlug, frontMatter: data, content };
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postDirectory);
  const allPosts = postFiles.map((postFile) => getPostData(postFile));
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.frontMatter.date > postB.frontMatter.date ? -1 : 1
  );

  return sortedPosts;
}

export function getLatestPosts() {
  const latestPosts = getAllPosts().slice(0, NUM_OF_LATEST_POSTS);

  return latestPosts;
}
