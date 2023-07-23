const SITE_NAME = 'Bank app';

export const getTitle = (title) => {
  return title ? `${SITE_NAME} | ${title}` : SITE_NAME;
};
