/**
 * Custom error classes for the Oblien Domains API
 */

/**
 * Base error class for all API errors
 */
export class ApiError extends Error {
    code: string;
    status?: number;
    details?: any;

    constructor(message: string, code: string, status?: number, details?: any) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
        this.details = details;

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

/**
 * Base error class for domain-related errors
 */
export class DomainError extends ApiError {
    constructor(message: string, code: string, details?: any) {
        super(message, code, 400, details);
        this.name = 'DomainError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}

/**
 * Error for validation failures
 */
export class ValidationError extends ApiError {
    constructor(message: string, details?: any) {
        super(message, 'VALIDATION_ERROR', 400, details);
        this.name = 'ValidationError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

/**
 * Error for authentication failures
 */
export class AuthenticationError extends ApiError {
    constructor(message: string = 'Invalid API key') {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

/**
 * Error for rate limit exceeded
 */
export class RateLimitError extends ApiError {
    constructor(message: string = 'Rate limit exceeded', resetTime?: Date) {
        super(message, 'RATE_LIMIT_ERROR', 429, { resetTime });
        this.name = 'RateLimitError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}

/**
 * Error for resource not found
 */
export class NotFoundError extends ApiError {
    constructor(resource: string, id: string) {
        super(`${resource} not found with ID: ${id}`, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

/**
 * Error for domain not available
 */
export class DomainNotAvailableError extends DomainError {
    constructor(domainName: string) {
        super(
            `Domain '${domainName}' is not available for registration`,
            'DOMAIN_NOT_AVAILABLE',
            { domainName }
        );
        this.name = 'DomainNotAvailableError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, DomainNotAvailableError.prototype);
    }
}

/**
 * Error for domain transfer failures
 */
export class DomainTransferError extends DomainError {
    constructor(domainName: string, reason: string) {
        super(
            `Transfer of domain '${domainName}' failed: ${reason}`,
            'DOMAIN_TRANSFER_ERROR',
            { domainName, reason }
        );
        this.name = 'DomainTransferError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, DomainTransferError.prototype);
    }
}

/**
 * Error for operations not allowed on a domain
 */
export class DomainOperationError extends DomainError {
    constructor(message: string, domainName: string) {
        super(message, 'DOMAIN_OPERATION_ERROR', { domainName });
        this.name = 'DomainOperationError';

        // This is needed for proper instanceof checks with custom errors
        Object.setPrototypeOf(this, DomainOperationError.prototype);
    }

}