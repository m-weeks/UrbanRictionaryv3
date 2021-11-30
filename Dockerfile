FROM node:14-alpine
WORKDIR /ur3

COPY . .
RUN npm install

RUN npm run build

CMD npm start