export type FrontMatter = {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  categories: string[];
  isFeatured?: boolean;
};

export type Post = {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
};
