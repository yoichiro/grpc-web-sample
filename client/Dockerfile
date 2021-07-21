FROM node:12.22.3 as builder

ADD package.json /client/
ADD tsconfig.json /client/
ADD yarn.lock /client/
ADD src /client/src
ADD public /client/public

WORKDIR /client

RUN yarn install
RUN yarn build

FROM nginx
COPY --from=builder /client/build /usr/share/nginx/html
