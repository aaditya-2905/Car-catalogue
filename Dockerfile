FROM nginx:1.25-alpine

LABEL version="1.0" maintainer="zalaaadityainh9@gmail.com"

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy only required static files
COPY ./ /usr/share/nginx/html/

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Give permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch user
USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
