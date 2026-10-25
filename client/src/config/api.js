/**
 * API configuration for Development & Production environments.
 * Set VITE_API_URL in your Vercel Environment Variables to point to your Render backend:
 * e.g., VITE_API_URL=https://your-backend.onrender.com
 * If left unset, it defaults to '' (relative path for local Vite proxy).
 */
export const API_BASE = import.meta.env.VITE_API_URL || '';
