# Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY . .
RUN npm run build

# Serve static
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve@14 --no-fund --no-audit
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "serve dist -s -l ${PORT:-3000}"]
