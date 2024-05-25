# stage 1
FROM node:latest as builder
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]

