# syntax=docker/dockerfile:1.7
# Production image for a self-managed server (VPS). Vercel deployments do not use this file.
FROM node:22.21.1-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The image is built without database access: pages are rendered on first request and then cached.
ARG DATABASE_URL=postgres://build:build@127.0.0.1:1/none
ENV BUILD_WITHOUT_DB=1
ARG PAYLOAD_SECRET=build-only-secret
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_GA_ID
ENV DATABASE_URL=$DATABASE_URL PAYLOAD_SECRET=$PAYLOAD_SECRET NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID NODE_ENV=production
RUN pnpm build && pnpm prune --prod --ignore-scripts

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd --system app && useradd --system --gid app app && mkdir -p /app/media /app/lead-files && chown app:app /app/media /app/lead-files
COPY --from=build --chown=app:app /app/package.json /app/next.config.mjs /app/tsconfig.json ./
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/.next ./.next
COPY --from=build --chown=app:app /app/public ./public
COPY --from=build --chown=app:app /app/src ./src
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
# Apply pending database migrations, then start the server.
CMD ["sh", "-c", "pnpm payload migrate && pnpm start"]
