export const generateSlug = (str: string) => {
  const slug = str?.replace(/ /g, '-')?.toLowerCase();

  return slug;
};
