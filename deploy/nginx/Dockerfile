FROM nginx:1.24.0

RUN rm /etc/nginx/conf.d/default.conf

# COPY content /usr/share/nginx/html

COPY conf/default.conf /etc/nginx/conf.d

COPY conf/proxy_params /etc/nginx/conf.d
COPY conf/locations /etc/nginx/conf.d