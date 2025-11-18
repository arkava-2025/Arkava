import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage, ServiciosPageQuery, ServiciosPageQueryVariables } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

const query = graphql(`
    query ServiciosPage($slug: String!, $stage: Stage! = PUBLISHED) {
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
                ... on Servicio {
                    title
                    ids
                    resume
                    description {
                        raw
                    }
                    iconService
                    imageService {
                        url
                    }
                }
            }
        }
  }
`);

export default async function getServiciosPage(
  slug: string = 'servicios',
  stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
) : Promise<ServiciosPageQuery> {
  const variables: ServiciosPageQueryVariables = {
    slug,
    stage: stage as Stage,
  };

  const data = await request<ServiciosPageQuery, ServiciosPageQueryVariables>(endpoint, query, variables);
  
  return data;
}
