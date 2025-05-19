FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/gateway ./apps/gateway
COPY lib ./lib

RUN npm install
RUN npm run build gateway

CMD ["node", "dist/apps/gateway/main.js"]
