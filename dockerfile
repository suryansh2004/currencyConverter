FROM node:lts
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]