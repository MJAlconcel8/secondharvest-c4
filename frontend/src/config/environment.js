// Frontend Environment Configuration
export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  appName: import.meta.env.VITE_APP_NAME || 'SecondHarvest',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  
  // API endpoints
  endpoints: {
    events: '/api/events',
    user: '/api/user',
  },
};

// Build full API URLs
export const api = {
  baseUrl: environment.apiUrl,
  events: `${environment.apiUrl}/api/events`,
  user: `${environment.apiUrl}/api/user`,
};
