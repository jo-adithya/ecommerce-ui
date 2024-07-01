######################
# BASE STAGE
######################

FROM node:alpine AS base

ENV PNPM_HOME=/usr/local/bin

RUN corepack enable && corepack prepare pnpm@latest --activate

######################
# DEPS STAGE
######################

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

######################
# BUILD STAGE
######################

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build
RUN pnpm prune --prod

######################
# DEVELOPMENT STAGE
######################

FROM base AS development

WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules 
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["pnpm", "dev"]

######################
# PRODUCTION STAGE
######################

FROM base AS production

USER node

WORKDIR /usr/src/app

# Copy only the required files to the final container
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

EXPOSE 3000

CMD ["HOSTNAME=\"0.0.0.0\"", "node", "server.js"]

