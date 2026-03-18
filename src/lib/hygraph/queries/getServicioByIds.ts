import { request, gql } from 'graphql-request';

const endpoint = import.meta.env.HYGRAPH_ENDPOINT as string;

interface ServicioData {
  title: string;
  ids?: string | null;
  resume?: string | null;
  description?: { raw: any } | null;
  iconService?: string | null;
  imageService: Array<{ url: string }>;
}

const query = gql`
  query GetServicioByIds($ids: String!) {
    servicios(where: { ids: $ids }, first: 1) {
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
`;

export default async function getServicioByIds(ids: string): Promise<ServicioData | null> {
  const data = await request<{ servicios: ServicioData[] }>(endpoint, query, { ids });
  return data?.servicios?.[0] ?? null;
}
