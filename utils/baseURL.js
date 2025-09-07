export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""; // browser
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL; // your own env var
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000"; // local
};