# LTS at time of project initialization
FROM node:10.14.1

# https://medium.com/@mccode/processes-in-containers-should-not-run-as-root-2feae3f0df3b
# run as non-root user inside the docker container
# create user with known user id
# Create group of appusers
# Create user in appusers group with name gifstore-server-appuser
# This user has a system account and a home directory
RUN groupadd -r appusers \
  && useradd -r -m -g appusers gifstore-server-appuser
# now run as new user nodejs from group nodejs
USER gifstore-server-appuser

# Explicitly copy package.json and package-lock.json files
# If these files change, Docker layer will be rebuilt
# Copy these files and set ownership to aforementioned user (https://serverfault.com/a/909194)
COPY --chown=gifstore-server-appuser:appusers package*.json /node/src/gifstore-server/

# Explicitly set working directory
WORKDIR /node/src/gifstore-server/

# Install dependencies
RUN npm install

# Copy application files to container
COPY --chown=gifstore-server-appuser:appusers ./ /node/src/gifstore-server/

# Document that container should expose PORT 3000
EXPOSE 3000 49153 5432

CMD ["npm", "start"]
