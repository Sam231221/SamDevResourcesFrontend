import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '1cm9lbsx',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: 'skAR9PErkeHMteCURYcsNacvPQD114AsPhTaMW1lL4dIt4lwEKkd692eSw9wBq2nws2MZwMExyPfCoLVOVbwolF3zI6Ou7azP9qLGMuYTar6Z0fTjkG0NIkf3882dO10T7wxHLlTDLcJMryhIOyIThHQmzikKCxaUYgbFz2OhnaUQdW50797',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
