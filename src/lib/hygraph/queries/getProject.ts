import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage, GetSingleProjectQuery } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

const query = graphql(`
  query GetSingleProject($slug: String!, $stage: Stage! = PUBLISHED) {
    singleProjectPage(where: { slug: $slug }, stage: $stage) {
      project
      slug
      relatedProject {
        id
        title
        description
        ubicacion
        cliente
        servicios
        coverImage {
          url
        }
        gallery {
          url
        }
      }
    }
  }
`);


export default async function getSingleProject(
  slug: string,
  stage: 'PUBLISHED' | 'DRAFT',
): Promise<GetSingleProjectQuery> {
  const variables = {
    slug: slug,
    stage: (stage as Stage) || ('PUBLISHED' as Stage),
  };

  const data = await request<GetSingleProjectQuery>(endpoint, query, variables);

  return data;
}

