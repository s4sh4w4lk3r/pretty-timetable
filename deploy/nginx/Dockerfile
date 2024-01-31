FROM nginx:stable
RUN rm /etc/nginx/conf.d/default.conf
# COPY content /usr/share/nginx/html

COPY conf/default.conf /etc/nginx/conf.d

COPY conf/proxy_params /etc/nginx/
COPY conf/routes /etc/nginx/