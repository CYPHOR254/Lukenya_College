// export const environment = {
//   production: false,
//   apiUrl: 'http://localhost:3000/api' // 🔥 your base URL
// };


// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://lukenya-college-backed.onrender.com',

  // Sanity CMS configuration
  // TODO: Replace 'YOUR_PROJECT_ID' with your actual Sanity project ID
  // after running `cd cms && npx sanity init`
  sanity: {
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
    apiVersion: '2024-01-01',
  },
};