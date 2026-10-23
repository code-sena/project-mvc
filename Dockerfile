# project-mvc - imagen de la app Next.js
# Ver public/docs/architecture/01-architecture.md

FROM node:20-alpine AS base

WORKDIR /app

# Dependencias en una capa separada para aprovechar la cache de Docker
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
