FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps

COPY . .

CMD [ "npm", "start" ]
