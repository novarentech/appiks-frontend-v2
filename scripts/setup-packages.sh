#!/bin/bash
# Script untuk setup package.json semua Next.js apps di Turborepo

APPS_DIR="/Users/upikaachu/Developer/Works/Novaren/appiks-mono/apps"

# ── student (port 3001) ──────────────────────────────────────────────────────
cat > "$APPS_DIR/student/package.json" << 'EOF'
{
  "name": "@appiks/student",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001 --turbopack",
    "build": "next build",
    "start": "next start --port 3001",
    "lint": "eslint",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@appiks/api-client": "*",
    "@appiks/auth": "*",
    "@appiks/types": "*",
    "@appiks/ui": "*",
    "canvas-confetti": "^1.9.3",
    "framer-motion": "^12.23.12",
    "next": "16.2.7",
    "next-auth": "5.0.0-beta.30",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOF

# ── school (port 3002) ───────────────────────────────────────────────────────
cat > "$APPS_DIR/school/package.json" << 'EOF'
{
  "name": "@appiks/school",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3002 --turbopack",
    "build": "next build",
    "start": "next start --port 3002",
    "lint": "eslint",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@appiks/api-client": "*",
    "@appiks/auth": "*",
    "@appiks/types": "*",
    "@appiks/ui": "*",
    "framer-motion": "^12.23.12",
    "next": "16.2.7",
    "next-auth": "5.0.0-beta.30",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "recharts": "^3.1.2",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOF

# ── psychologist (port 3003) ─────────────────────────────────────────────────
cat > "$APPS_DIR/psychologist/package.json" << 'EOF'
{
  "name": "@appiks/psychologist",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3003 --turbopack",
    "build": "next build",
    "start": "next start --port 3003",
    "lint": "eslint",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@appiks/api-client": "*",
    "@appiks/auth": "*",
    "@appiks/types": "*",
    "@appiks/ui": "*",
    "framer-motion": "^12.23.12",
    "next": "16.2.7",
    "next-auth": "5.0.0-beta.30",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "recharts": "^3.1.2",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOF

# ── superadmin (port 3004) ───────────────────────────────────────────────────
cat > "$APPS_DIR/superadmin/package.json" << 'EOF'
{
  "name": "@appiks/superadmin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3004 --turbopack",
    "build": "next build",
    "start": "next start --port 3004",
    "lint": "eslint",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@appiks/api-client": "*",
    "@appiks/auth": "*",
    "@appiks/types": "*",
    "@appiks/ui": "*",
    "framer-motion": "^12.23.12",
    "next": "16.2.7",
    "next-auth": "5.0.0-beta.30",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "recharts": "^3.1.2",
    "sonner": "^2.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
EOF

echo "✅ All package.json files updated!"
