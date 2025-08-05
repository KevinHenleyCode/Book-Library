# 1. Install dependencies with pnpm
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY pnpm-lock.yaml package.json ./
ENV PNPM_HOME=/pnpm-store
RUN pnpm config set store-dir /pnpm-store
VOLUME /pnpm-store
ENV PNPM_SKIP_BUILD_SCRIPT_CHECK=true
RUN pnpm install --frozen-lockfile --ignore-scripts=false

# 2. Build app
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
ARG GOOGLE_BOOKS_API_KEY
ENV GOOGLE_BOOKS_API_KEY=$GOOGLE_BOOKS_API_KEY
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/package.json ./package.json
COPY . .
RUN pnpm build

# 3. Serve app
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["pnpm", "start"]