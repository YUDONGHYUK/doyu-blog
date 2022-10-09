export const generateSlug = (str: string) => {
  let slug = str?.replace(/ /g, '-').toLowerCase();

  slug = slug
    ?.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return slug;
};
