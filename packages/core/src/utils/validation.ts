/**
 * Domain validation utilities
 */

/**
 * Validates a domain name
 * @param domainName Domain name to validate
 * @returns Boolean indicating if the domain name is valid
 */
export function validateDomainName(domainName: string): boolean {
    if (!domainName) return false;

    // Basic validation: check if the domain matches the general format
    // This regex validates domain names according to RFC 1035, RFC 1123, and RFC 2181
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainRegex.test(domainName)) return false;

    // Check for valid TLD (must have at least one dot)
    const parts = domainName.split('.');
    if (parts.length < 2) return false;

    // Make sure the TLD isn't only numbers
    const tld = parts[parts.length - 1];
    if (/^\d+$/.test(tld)) return false;

    return true;
}
