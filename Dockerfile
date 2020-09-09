FROM node:latest
EXPOSE 4000
COPY ./ .
RUN npm install
ENTRYPOINT ["npm","run","start"]