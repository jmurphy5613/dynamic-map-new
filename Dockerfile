# Use latest LTS version of node
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# --legacy-peer-deps was the fix to get this working
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

RUN npm run build

# Simple way to serve the built files
RUN npm install -g serve

CMD ["serve", "-s", "build"]
