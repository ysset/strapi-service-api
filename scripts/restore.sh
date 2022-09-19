echo "Enter dump file name from 'dumps' file on production server "
read filePath
echo "Enter server IP"
read IP

rm -rf ../dumps
mkdir ../dumps
scp root@${IP}:~/TelegramBot/dumps/${filePath}/uploads.zip ../dumps
scp root@${IP}:~/TelegramBot/dumps/${filePath}/db-dump.sql ../dumps

cat ../dumps/db-dump.sql | docker-compose exec -T DB psql -U develop xattaBot
rm -rf ../public
unzip ../dumps/uploads.zip
mv ./public ../
