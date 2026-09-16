// ===================================================================
// 3D RED SPIDER LOGO COMPONENT (Based on Reference Image 2)
// Precision SVG with 3D beveled crimson geometry, 8 angular legs,
// and high-intensity neon red cast glow.
// ===================================================================

export default function SpiderLogo({
  size = 64,
  className = "",
  glow = true,
  animate = false,
  style = {}
}) {
  return (
    <div
      className={`spider-logo-container ${animate ? 'spider-logo-pulse' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: glow ? 'drop-shadow(0 0 16px rgba(230, 36, 41, 0.75)) drop-shadow(0 0 35px rgba(230, 36, 41, 0.4))' : 'none',
        ...style
      }}
    >
      <svg
        viewBox="0 0 200 220"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dual-tone 3D Crimson Gradients for beveled depth */}
          <linearGradient id="spiderRedBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4148" />
            <stop offset="45%" stopColor="#e61a22" />
            <stop offset="100%" stopColor="#990a0f" />
          </linearGradient>

          <linearGradient id="spiderRedDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cf141b" />
            <stop offset="50%" stopColor="#87090e" />
            <stop offset="100%" stopColor="#4a0407" />
          </linearGradient>

          <linearGradient id="spiderSpineHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7b80" />
            <stop offset="60%" stopColor="#e61a22" />
            <stop offset="100%" stopColor="#87090e" />
          </linearGradient>

          {/* Core drop shadow filter */}
          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* ----------------- UPPER LEGS (PAIR 1: Highest & Steepest) ----------------- */}
          {/* Left Upper Leg 1 */}
          <path
            d="M 94 80 L 88 50 L 92 18 C 92 18 84 45 80 62 L 80 84 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 92 18 L 88 50 L 76 68 L 74 86 L 80 84 L 80 62 C 84 45 92 18 92 18 Z"
            fill="url(#spiderRedDark)"
          />

          {/* Right Upper Leg 1 */}
          <path
            d="M 106 80 L 112 50 L 108 18 C 108 18 116 45 120 62 L 120 84 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 108 18 L 112 50 L 124 68 L 126 86 L 120 84 L 120 62 C 116 45 108 18 108 18 Z"
            fill="url(#spiderRedDark)"
          />

          {/* ----------------- UPPER-MID LEGS (PAIR 2: Flared Out & Sharp) ----------------- */}
          {/* Left Upper Leg 2 */}
          <path
            d="M 88 90 L 74 65 L 75 48 C 75 48 70 70 65 88 L 84 94 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 75 48 L 70 70 L 63 92 L 78 95 L 84 94 L 65 88 Z"
            fill="url(#spiderRedDark)"
          />

          {/* Right Upper Leg 2 */}
          <path
            d="M 112 90 L 126 65 L 125 48 C 125 48 130 70 135 88 L 116 94 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 125 48 L 130 70 L 137 92 L 122 95 L 116 94 L 135 88 Z"
            fill="url(#spiderRedDark)"
          />

          {/* ----------------- LOWER-MID LEGS (PAIR 3: Aggressive Angular Elbows) ----------------- */}
          {/* Left Mid Leg 3 */}
          <path
            d="M 82 102 L 40 102 L 35 106 L 44 148 L 52 135 L 48 112 L 80 106 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 35 106 L 44 148 L 47 185 L 44 148 L 48 112 Z"
            fill="url(#spiderRedDark)"
          />

          {/* Right Mid Leg 3 */}
          <path
            d="M 118 102 L 160 102 L 165 106 L 156 148 L 148 135 L 152 112 L 120 106 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 165 106 L 156 148 L 153 185 L 156 148 L 152 112 Z"
            fill="url(#spiderRedDark)"
          />

          {/* ----------------- LOWER LEGS (PAIR 4: Longest Downward Pincers) ----------------- */}
          {/* Left Lower Leg 4 */}
          <path
            d="M 86 112 L 68 118 L 74 165 L 88 198 L 86 175 L 77 140 L 84 116 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 74 165 L 88 198 L 92 205 L 88 198 L 86 175 Z"
            fill="url(#spiderRedDark)"
          />

          {/* Right Lower Leg 4 */}
          <path
            d="M 114 112 L 132 118 L 126 165 L 112 198 L 114 175 L 123 140 L 116 116 Z"
            fill="url(#spiderRedBright)"
          />
          <path
            d="M 126 165 L 112 198 L 108 205 L 112 198 L 114 175 Z"
            fill="url(#spiderRedDark)"
          />

          {/* ----------------- CENTRAL SPIDER BODY (HEAD, THORAX & ABDOMEN) ----------------- */}
          {/* Head & Mandibles */}
          <polygon
            points="100,68 108,76 105,86 100,88 95,86 92,76"
            fill="url(#spiderSpineHighlight)"
          />
          {/* Mandibles Left/Right */}
          <polygon points="95,68 90,60 97,66" fill="url(#spiderRedDark)" />
          <polygon points="105,68 110,60 103,66" fill="url(#spiderRedBright)" />

          {/* Thorax / Midsection */}
          <polygon
            points="100,88 112,96 110,110 100,115 90,110 88,96"
            fill="url(#spiderRedBright)"
          />
          <polygon
            points="100,88 90,96 90,110 100,115"
            fill="url(#spiderRedDark)"
            opacity="0.4"
          />

          {/* Diamond-Faceted Abdomen (Image 2 Characteristic Shape) */}
          <polygon
            points="100,118 116,132 112,154 100,172 88,154 84,132"
            fill="url(#spiderRedBright)"
          />
          {/* Left bevel shade on abdomen */}
          <polygon
            points="100,118 84,132 88,154 100,172"
            fill="url(#spiderRedDark)"
            opacity="0.6"
          />
          {/* Central spine highlight line */}
          <line
            x1="100"
            y1="72"
            x2="100"
            y2="170"
            stroke="#ff8085"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
