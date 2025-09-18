export * from './mapping';
export * from './helpers';

export const isPreview = () => import.meta.env.HYGRAPH_IS_PREVIEW === 'yes';
