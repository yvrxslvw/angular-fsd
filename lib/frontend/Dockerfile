FROM node:lts-iron AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY --from=builder /app/nginx/fsd.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
