import { request, gql } from 'graphql-request';

const endpoint = import.meta.env.HYGRAPH_ENDPOINT;

export async function hygraphRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  return request<T>(endpoint, query, variables);
}
