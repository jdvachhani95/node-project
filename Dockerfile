FROM node:8
WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 2000
CMD ["npm","run","start:env"]
