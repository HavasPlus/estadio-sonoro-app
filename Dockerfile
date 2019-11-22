FROM node:10.15.2

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build
CMD ["npm", "run", "start-server"]

EXPOSE 3000
