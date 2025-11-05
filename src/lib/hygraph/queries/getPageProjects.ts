import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage, ProyectosPageQuery, ProyectosPageQueryVariables } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

const query = graphql(`
    query ProyectosPage($slug: String!, $stage: Stage! = PUBLISHED) {
        pageInternal(where: { slug: $slug }, stage: $stage) {
            titlePage
            metaTitle
            metaDescripcion
            backgroundPage {
                url
            }
            description {
                raw
            }
            content {
                ... on Project {
                title
                slug
                seoTitle
                seoDescription
                description
                coverImage {
                    url
                }
                gallery {
                    url
                }
                isFeatured
                }
            }
        }
    }
`);

export default async function getProyectosPage(
  slug: string = 'proyectos',
  stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
) : Promise<ProyectosPageQuery> {
  const variables: ProyectosPageQueryVariables = {
    slug,
    stage: stage as Stage,
  };

  const data = await request<ProyectosPageQuery, ProyectosPageQueryVariables>(endpoint, query, variables);
  
  return data;
}
