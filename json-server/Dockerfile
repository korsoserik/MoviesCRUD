FROM node
WORKDIR /home/node/app
COPY ./movies.json .
RUN npm i -g json-server
ENTRYPOINT ["json-server", "movies.json", "-h", "0.0.0.0"]