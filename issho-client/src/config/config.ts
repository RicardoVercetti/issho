// src/config.ts
const baseUrl = import.meta.env.VITE_ISSHO_API_BASE_URL;

if (!baseUrl) {
  throw new Error("VITE_ISSHO_API_BASE_URL is not defined in the .env file");
}

export const API_BASE_URL = baseUrl;
