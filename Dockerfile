# Use an official Node runtime as a parent image
FROM node:20-alpine as build-stage

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the container
COPY package.json .

# Install dependencies
RUN yarn

COPY . .

# Build the React app
RUN yarn build

FROM node:20-alpine as production-stage

WORKDIR /app

RUN yarn global add serve

COPY --from=build-stage /app/dist /app/dist

EXPOSE 4444 

CMD ["serve","-s","/app/dist", "-l", "4444"]
