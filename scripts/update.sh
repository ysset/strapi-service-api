#!/bin/bash
pm2 stop all
git pull origin master
yarn
cd src/plugins/xatta-bot/
yarn
cd ../xatta-realtor-admin-bot
yarn
cd ../
if [ $1 == -d ]; then
  docker-compose up --no-start
  docker-compose start DB
fi
pm2 start server.js
