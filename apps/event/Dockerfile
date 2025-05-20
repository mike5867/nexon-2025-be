FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY apps/event ./apps/event
COPY apps/auth ./apps/auth
COPY lib ./lib

RUN npm install
RUN npm run build event

CMD ["node", "dist/apps/event/main.js"]
