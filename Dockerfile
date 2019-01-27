# LTS at time of project initialization
FROM node:10.14.1

# Explicitly set working directory
WORKDIR /home/node/gifstore-server

# Explicitly copy package.json and package-lock.json files
# If these files change, Docker layer will be rebuilt
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files to container
COPY ./ ./

# Document that container should expose PORT 3000
EXPOSE  3000

CMD ["npm", "start"]
