export const scrollToHeading = (slug: string) => {
  console.log(`#${slug}`);
  const element = document.querySelector(`#${slug}`) as HTMLHeadingElement;

  window.history.pushState('', '', `#${slug}`);

  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth',
  });
};
