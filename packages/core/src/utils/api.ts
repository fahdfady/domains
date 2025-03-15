/**
 * Utility to make API requests to the Oblien Domains API
 */

/**
 * Request options for makeRequest
 */
export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    apiKey: string;
    body?: string;
    timeout?: number;
}

/**
 * API Response error
 */
export interface ApiErrorResponse {
    code: string;
    message: string;
    details?: any;
}

/**
 * Make a request to the API
 * @param url The URL to request
 * @param options Request options
 * @returns Promise resolving to the response data
 */
export async function makeRequest<T>(url: string, options: RequestOptions): Promise<T> {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`,
        'User-Agent': 'Oblien-Domains-Node/0.0.1',
    });

    const timeout = options.timeout || 30000; // Default timeout of 30 seconds

    try {
        // Create an AbortController for request timeouts
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: options.method,
            headers,
            body: options.body,
            signal: controller.signal,
        });

        // Clear the timeout since the request completed
        clearTimeout(timeoutId);

        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            const errorResponse = data as ApiErrorResponse;
            throw new Error(`API Error ${response.status}: ${errorResponse.message || response.statusText}`);
        }

        return data as T;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
        }
        throw error;
    }
}