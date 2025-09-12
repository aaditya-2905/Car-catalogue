#small and stable image base
FROM nginx:1.25-alpine

#Label 
LABEL version="1.0" maintainer="zalaaadityainh9@gmail.com"

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]