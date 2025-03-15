import { OblienDomainsClient } from '@/client';
import { ClientOptions } from '@/client/types';

export * from './client/types';

export * from './errors';

/**
 * Create a new Oblien Domains client instance
 * @param apiKey Your Oblien Domains API key
 * @param options Additional client options
 */
export function createClient(apiKey: string, options?: ClientOptions): OblienDomainsClient {
    return new OblienDomainsClient(apiKey, options);
}

export { OblienDomainsClient } from '@/client';

export default createClient;