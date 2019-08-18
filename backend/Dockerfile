FROM node:alpine

WORKDIR /opt/src

COPY package*.json ./

RUN npm install

COPY . .

# Build output goes to /opt/app
RUN mkdir /opt/app && \
	npm run build && \
#	npm prune --production && \
	mv package.json ../app/ && \
	mkdir -p ../cache && \
	mv node_modules ../cache && \
	cd .. && \
	rm -rf src && \
	cd app && \
	echo '#!/bin/sh' > start.sh && \
	echo 'if [ -d /opt/app/node_modules ]; then' >> start.sh && \
	echo '	echo "Synchronizing mounted host cache"' >> start.sh && \
	echo '	cp -r -u /opt/cache/node_modules/* /opt/app/node_modules/' >> start.sh && \
	echo 'else' >> start.sh && \
	echo '	echo "No host cache mounted"' >> start.sh && \
	echo '	mv /opt/cache/node_modules /opt/app/' >> start.sh && \
	echo 'fi' >> start.sh && \
	echo 'npm start' >> start.sh && \
	chmod 755 start.sh

WORKDIR /opt/app

#EXPOSE 4200
ENTRYPOINT SOCKET=/opt/common/ipc.socket ./start.sh