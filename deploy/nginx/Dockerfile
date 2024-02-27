FROM nginx:1.24.0

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# COPY content /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d