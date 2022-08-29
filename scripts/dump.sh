pm2 stop all

mkdir ../dumps
mkdir ../dumps/dump_$(date '+%d-%m-%Y_%H')
docker-compose exec DB pg_dump -c -U develop xattaBot --no-owner > ../dumps/dump_$(date '+%d-%m-%Y_%H')/db-dump.sql

zip uploads.zip ../public/uploads/*
mv uploads.zip ../dumps/dump_$(date '+%d-%m-%Y_%H')

pm2 start all