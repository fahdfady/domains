import { ClientOptions } from "@/client/types";
import { DomainService } from "@/services/domain";

/**
 * Main client for interacting with the Oblien Domains API
 */
export class OblienDomainsClient {
    private baseUrl: string;
    private apiKey: string;

    /**
     * Create a new Oblien Domains client
     * @param apiKey Your API key
     * @param options Additional client options
     */
    constructor(apiKey: string, options?: ClientOptions) {
        this.apiKey = apiKey;
        this.baseUrl = options?.baseUrl || "https://api.oblien.com/v1";
    }

    /**
     * Get the domain service
     * @returns DomainService - The domain service
     */
    getDomainService(): DomainService {
        return new DomainService(this.apiKey, this.baseUrl);
    }
}