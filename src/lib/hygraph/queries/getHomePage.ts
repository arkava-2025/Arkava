


import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT;

const query = graphql(`
    query HomePage($slug: String!, $stage: Stage! = PUBLISHED) {
    page(where: { slug: $slug }, stage: $stage) {
      id
      title
      slug
      sections(orderBy: order_ASC) {
        id
        internalName
        sectionType
        order
        isVisible
        content {
          __typename

          ... on Hero {
            title
            description
          }
        }
      }
    }
  }
`);

export default async function getHomePage(
  slug: string = 'home',
  stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
) {
  const variables = {
    slug,
    stage: stage as Stage,
  };

  const data = await request(endpoint, query, variables);
  return data;
}

