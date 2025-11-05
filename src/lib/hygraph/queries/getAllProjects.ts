import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { Stage, GetAllProjectsQuery, GetAllProjectsQueryVariables } from '@/gql/graphql';
const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

const query = graphql(`
  query GetAllProjects($stage: Stage! = PUBLISHED, $limit: Int!) {
        projects(stage: $stage, first: $limit) {
            id
            slug
        }
    }
`);


// Aquí no requerimos 'slug', solo 'stage' es opcional
export default async function getAllProjects(
    stage: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED',
): Promise<GetAllProjectsQuery['projects']> {
    const variables: GetAllProjectsQueryVariables = {
        stage: stage as Stage,
        limit: 20,
    };

    const data = await request<GetAllProjectsQuery, GetAllProjectsQueryVariables>(endpoint, query, variables);

    return data?.projects;
}

