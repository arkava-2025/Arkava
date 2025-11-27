import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage, HomePageQuery, HomePageQueryVariables } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

const query = graphql(`
    query HomePage($slug: String!, $stage: Stage! = PUBLISHED) {
    page(where: { slug: $slug }, stage: $stage) {
      id
      title
      slug
      sections {
        id
        internalName
        sectionType
        isVisible
        content {
          __typename
          ... on Hero {
            title
            description
          }
          ... on Experiencia {
            numProjects
            porcentajeSatisfacion
            anosExperiencia
            garantiaRespuesta
          }
          ... on Servicios {
            servicetitle: title
            subtitle
            description
            bgImage {
              url
            }
            services {
              title
              description { raw }
              iconService
              imageService {
                url
              }
            }
          }
          ... on ProyectosHome {
            titleProyectHome: title
            subtitle
            description
            __typename
            projects {
              title
              slug
              seoTitle
              seoDescription
              description
              resume
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
    }
  }
`);

export default async function getHomePage(
  slug: string = 'home',
  stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
) : Promise<HomePageQuery> {
  const variables: HomePageQueryVariables = {
    slug,
    stage: stage as Stage,
  };

  const data = await request<HomePageQuery, HomePageQueryVariables>(endpoint, query, variables);
  
  return data;
}
