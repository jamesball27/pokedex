FROM node:13-alpine
WORKDIR /app
EXPOSE 3000
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
CMD ["yarn", "start"] 