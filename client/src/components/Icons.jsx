// Dedicated SVG Icons for Social and Brand links
export function GithubIcon({ size = 18, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function SpiderIcon({ size = 19, active = false, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={active ? "var(--spider-red)" : "none"}
      stroke={active ? "var(--spider-red-glow)" : color}
      strokeWidth={active ? "1.6" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        filter: active ? 'drop-shadow(0 0 6px rgba(230, 36, 41, 0.85))' : 'none',
        transition: 'all 0.25s ease'
      }}
    >
      {/* Spider Head & Body */}
      <path d="M12 7.5 C10.6 7.5 9.8 8.8 9.8 10.5 C9.8 12.8 10.8 15 12 16.5 C13.2 15 14.2 12.8 14.2 10.5 C14.2 8.8 13.4 7.5 12 7.5 Z" />
      <circle cx="12" cy="5.2" r="1.4" />
      {/* Top Legs */}
      <path d="M10 8.5 L5.8 4.2 L4.2 6.5" />
      <path d="M14 8.5 L18.2 4.2 L19.8 6.5" />
      {/* Upper-Mid Legs */}
      <path d="M9.6 10.3 L4.2 9.5 L3.2 12.2" />
      <path d="M14.4 10.3 L19.8 9.5 L20.8 12.2" />
      {/* Lower-Mid Legs */}
      <path d="M9.8 12.5 L4.8 15.5 L5.8 18.2" />
      <path d="M14.2 12.5 L19.2 15.5 L18.2 18.2" />
      {/* Bottom Legs */}
      <path d="M11 15 L7.5 19.8 L8.8 22" />
      <path d="M13 15 L16.5 19.8 L15.2 22" />
    </svg>
  );
}

