// AgroVision API Client
// Secure configurable HTTP client supporting future Node.js / Express backend
// Reads VITE_API_URL environment variable without embedding any secret tokens

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const isLiveBackendConfigured = () => Boolean(BASE_URL && BASE_URL.trim() !== '');

export async function apiRequest(endpoint, options = {}) {
  if (!isLiveBackendConfigured()) {
    // Return null to signify that local mock services should handle the request
    return null;
  }

  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API Request Failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[AgroVision API Client] Network request to ${url} failed. Falling back to local demonstration data.`, error);
    return null;
  }
}
