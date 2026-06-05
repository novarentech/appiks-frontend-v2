FROM node:22-alpine AS base

# Step 1: Prune the workspace
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@appiks/landing --docker

# Step 2: Install dependencies
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfile and pruned package.json files
COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/package-lock.json ./
RUN npm ci

# Step 3: Build the application
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=installer /app/ ./
COPY --from=pruner /app/out/full/ ./
COPY turbo.json turbo.json

RUN npx turbo run build --filter=@appiks/landing

# Step 4: Runner
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astrojs

# Copy built app and dependencies
COPY --from=builder /app ./

USER astrojs

EXPOSE 4321
ENV PORT 4321
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "preview", "--workspace=@appiks/landing"]
