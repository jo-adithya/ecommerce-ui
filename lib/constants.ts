export const BASE_API_URL =
  typeof window === 'undefined'
    ? process.env.BASE_API_URL
    : process.env.NEXT_PUBLIC_BASE_API_URL;
