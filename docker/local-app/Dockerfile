FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all HTML files
COPY *.html /usr/share/nginx/html/

# Create fashionhub directory structure
RUN mkdir -p /usr/share/nginx/html/fashionhub && \
    cp /usr/share/nginx/html/*.html /usr/share/nginx/html/fashionhub/ && \
    chmod -R 755 /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]