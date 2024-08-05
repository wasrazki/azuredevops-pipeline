# Stage 1
FROM node:latest as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html

#  remove index.html and copy files from yalla directory
RUN rm /usr/share/nginx/html/index.html \
    && cp -r /usr/share/nginx/html/yalla/* /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
