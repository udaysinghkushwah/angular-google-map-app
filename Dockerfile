# FROM node:8.10
# WORKDIR /app
# COPY package.json /app/
# RUN npm install -g @angular/cli
# RUN npm install -g angular-http-server
# RUN npm i -g @biesbjerg/ngx-translate-extract


# RUN npm install
# COPY . /app
# RUN ng build --prod
 
# WORKDIR /app
 
# #COPY . dist/imrideConsole/
# EXPOSE 80
# ENV PORT 80
# RUN npm install -g lite-server
# CMD [ "lite-server"]



### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:8.10 as builder

WORKDIR /app
COPY package.json /app/
RUN npm install -g @angular/cli
RUN npm install -g angular-http-server
RUN npm i -g @biesbjerg/ngx-translate-extract

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm install
COPY . /app
RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
