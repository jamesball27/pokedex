FROM node:13-alpine
WORKDIR /app
EXPOSE 3000
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"] 