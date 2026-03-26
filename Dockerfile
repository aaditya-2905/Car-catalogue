FROM nginx:1.25-alpine
LABEL version="1.0" maintainer="zalaaadityainh9@gmail.com"

RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

COPY ./ /usr/share/nginx/html/

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Fix permissions for nginx runtime (VERY IMPORTANT)
RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx && \
    chown -R appuser:appgroup \
    /var/cache/nginx \
    /var/run/nginx \
    /var/log/nginx \
    /usr/share/nginx/html

USER appuser

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]