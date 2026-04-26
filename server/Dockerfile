FROM node:20-alpine AS builder
RUN apk add --no-cache python3 py3-pip openjdk17 g++ bash make
RUN npm install -g ts-node typescript
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache python3 py3-pip openjdk17 g++ bash make
RUN npm install -g ts-node typescript
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 4000
CMD ["node", "dist/index.js"]