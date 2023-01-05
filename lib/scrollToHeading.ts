export const scrollToHeading = (slug: string) => {
  const element = document.querySelector(`#${slug}`) as HTMLHeadingElement;

  window.history.pushState('', '', `#${slug}`);

  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth',
  });
};
