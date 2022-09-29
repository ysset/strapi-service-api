echo "Enter dump file name from 'dumps' file on production server "
read filePath
echo "Enter server IP"
read IP

mkdir ../restores
mkdir ../restores/dump_$(date '+%d-%m-%Y_%H')

scp root@${IP}:~/xatta-telegram-bot/dumps/${filePath}/uploads.zip ../restores/dump_$(date '+%d-%m-%Y_%H')
scp root@${IP}:~/xatta-telegram-bot/dumps/${filePath}/db-dump.sql ../restores/dump_$(date '+%d-%m-%Y_%H')

cat ../restores/dump_$(date '+%d-%m-%Y_%H')/db-dump.sql | docker-compose exec -T DB psql -U develop xattaBot
rm -rf ../public
unzip ../restores/dump_$(date '+%d-%m-%Y_%H')/uploads.zip
mv ./public ../
