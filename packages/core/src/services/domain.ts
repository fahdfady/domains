import { makeRequest } from "@/utils/api"
import { Domain, DomainRegistrationOptions, DomainStatus, DnsRecord, DnsRecordInput, DomainAvailability, DomainSearchOptions, DomainSearchResult } from "@/client/types"
import { DomainError, DomainNotAvailableError, DomainTransferError, DomainOperationError, ValidationError } from "@/errors"
import { validateDomainName } from "@/utils/validation";

export class DomainService {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl?: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || "https://api.oblien.com/v1";
    }

    /**
     * Search for domain names
     * @param query - The search query (e.g., "example")
     * @param options - Optional search options
     * @returns Promise<DomainSearchResult> - Search results
     */
    async search(query: string, options?: DomainSearchOptions): Promise<DomainSearchResult> {
        if (!query) throw new ValidationError("Search query is required");

        const params = new URLSearchParams();
        params.set("query", query);

        if (options?.tlds) {
            params.set("tlds", options.tlds.join(','));
        }

        if (options?.limit) {
            params.append('limit', options.limit.toString());;
        }

        return makeRequest<DomainSearchResult>(`${this.baseUrl}/domains/search?${params.toString()}`, {
            method: "GET",
            apiKey: this.apiKey,
        });
    }

    /**
     * Check the availability of a domain name
     * @param domainName - The domain name to check (e.g., "example.com")
     * @returns Promise<DomainAvailability> - Domain availability information
     */
    async checkAvailability(domainName: string): Promise<DomainAvailability> {
        if (!domainName) throw new ValidationError("Domain name is required");

        if (!validateDomainName(domainName)) throw new ValidationError("Invalid domain name");

        return makeRequest<DomainAvailability>(`${this.baseUrl}/domains/check?domain=${domainName}`, {
            method: "GET",
            apiKey: this.apiKey,
        });
    }
}
