FROM node:12.22.3

ADD package.json /client/
ADD tsconfig.json /client/
ADD yarn.lock /client/
ADD src /client/src
ADD public /client/public

RUN ls -laF /client

WORKDIR /client

RUN yarn install

EXPOSE 3000

CMD yarn start
