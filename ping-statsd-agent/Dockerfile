FROM registry.applifier.info:5000/applifier-nodejs:0.10.36-2

ADD ./ /app

RUN cd /app && npm install

CMD node /app/main.js /data/hosts.json