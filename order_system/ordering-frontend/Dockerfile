FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

# COPY public public
# COPY src src

# COPY .env .env
# COPY babel.config.js .
# COPY jsconfig.json .
# COPY vue.config.js .
COPY . .

ENTRYPOINT [ "npm", "run", "serve" ]