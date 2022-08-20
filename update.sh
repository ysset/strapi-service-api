#!/bin/bash
pm2 stop all
git pull origin master
yarn
cd src/plugins/xatta-bot/
yarn
cd ../xatta-realtor-admin-bot
yarn
cd ../../..
docker-compose up --no-start
docker-compose start DB
pm2 start server.js
