FROM node:21.2-bookworm as dev
WORKDIR /app
COPY . ./
RUN npm install -g pnpm
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

