FROM node:22-alpine

WORKDIR /app

COPY ./docker-example/ /app

RUN corepack enable && corepack use pnpm@latest-10
RUN pnpm install
RUN pnpm build:prod

EXPOSE 4200

CMD ["pnpm", "start:prod"]
