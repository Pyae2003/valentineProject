FROM node:20.19.6-alpine
WORKDIR /app
COPY package*.json .
RUN ["npm" , "install"]
COPY . .
EXPOSE 4000
CMD ["npm" ,"run","dev"]

