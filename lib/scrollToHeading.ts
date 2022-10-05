const MAIN_NAVIAGATION_HEIGHT = 75;

export const scrollToHeading = (slug: string) => {
  const element = document.querySelector(`#${slug}`) as HTMLHeadingElement;

  window.scrollTo({
    top: element.offsetTop - MAIN_NAVIAGATION_HEIGHT,
    behavior: 'smooth',
  });
};
