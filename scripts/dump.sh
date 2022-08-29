mkdir ../dumps/dump_$(date '+%d-%m-%Y_%H')
docker-compose exec DB pg_dump -c -U develop xattaBot --no-owner > ../dumps/dump_$(date '+%d-%m-%Y_%H')/db-dump.sql
ls
zip ../dumps/dump_$(date '+%d-%m-%Y_%H')/uploads ../public/uploads