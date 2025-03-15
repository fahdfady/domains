/**
 * Client configuration options
 */
export interface ClientOptions {
    /**
     * Base URL for the API (defaults to https://api.oblien.com/v1)
     */
    baseUrl?: string;

    /**
     * Request timeout in milliseconds (defaults to 30000)
     */
    timeout?: number;
}

/**
 * Domain search options
 */
export interface DomainSearchOptions {
    /**
     * TLDs to include in the search (e.g., ["com", "net", "org"])
     */
    tlds?: string[];

    /**
     * Maximum number of results to return
     */
    limit?: number;
}

/**
 * Contact information for domain registration
 */
export interface ContactInfo {
    firstName: string;
    lastName: string;
    organization?: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

/**
 * Domain registration options
 */
export interface DomainRegistrationOptions {
    /**
     * Domain name to register (e.g., "example.com")
     */
    domainName: string;

    /**
     * Registration period in years (1-10)
     */
    years: number;

    /**
     * Contact information for the domain
     */
    contactInfo: ContactInfo;

    /**
     * Nameservers to use (optional)
     */
    nameservers?: string[];

    /**
     * Whether to enable WHOIS privacy
     */
    enablePrivacy?: boolean;

    /**
     * Whether to enable auto-renewal
     */
    enableAutoRenew?: boolean;
}

/**
 * Domain information
 */
export interface Domain {
    id: string;
    domainName: string;
    status: DomainStatus;
    registrationDate: string;
    expirationDate: string;
    autoRenew: boolean;
    privateWhois: boolean;
    locked: boolean;
    nameservers: string[];
    contactInfo: ContactInfo;
}

/**
 * Domain status
 */
export enum DomainStatus {
    ACTIVE = 'active',
    PENDING = 'pending',
    EXPIRED = 'expired',
    TRANSFERRED_OUT = 'transferred_out',
    REDEMPTION = 'redemption',
}

/**
 * DNS record types
 */
export enum DnsRecordType {
    A = 'A',
    AAAA = 'AAAA',
    CNAME = 'CNAME',
    MX = 'MX',
    TXT = 'TXT',
    SRV = 'SRV',
    NS = 'NS',
    CAA = 'CAA',
}

/**
 * DNS record input for creating/updating records
 */
export interface DnsRecordInput {
    type: DnsRecordType;
    name: string;
    content: string;
    ttl?: number;
    priority?: number; // For MX and SRV records
}

/**
 * DNS record as returned by the API
 */
export interface DnsRecord extends DnsRecordInput {
    id: string;
    domainId: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Domain availability check result
 */
export interface DomainAvailability {
    domainName: string;
    available: boolean;
    premium?: boolean;
    price?: number;
}

/**
 * Search results
 */
export interface DomainSearchResult {
    query: string;
    results: DomainAvailability[];
}