export const API_V1_URL = import.meta.env.VITE_API_V1_URL || 'https://api.surfe-diem.com/api/v1';

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('API Configuration:', {
    API_V1_URL,
    env: {
      VITE_API_V1_URL: import.meta.env.VITE_API_V1_URL
    }
  });
}
