FROM node:lts-iron
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]
