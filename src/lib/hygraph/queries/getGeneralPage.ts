import { request } from 'graphql-request';
import { graphql } from '@/gql';
import type { GetGeneralPageQuery } from '@/gql/graphql';

const endpoint = import.meta.env.HYGRAPH_ENDPOINT;

const query = graphql(`
    query GetGeneralPage {
        generalInfos {
            whatsapp
            title
            urlInstagram
            email
            logo {
                url
            }
            logoDark {
                url
            }
        }
    }
`);

// Aquí no requerimos 'slug', solo 'stage' es opcional
export default async function getGeneralPage(): Promise<GetGeneralPageQuery['generalInfos'][number] | null> {
    const data = await request<GetGeneralPageQuery>(endpoint, query as any);
    const generalInfo = data?.generalInfos?.[0] ?? null;
    
    return generalInfo;
}
