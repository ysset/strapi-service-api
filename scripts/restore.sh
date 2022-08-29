echo "enter dump file name from 'dumps' file on production server "
read filePath
rm -rf ../dumps
mkdir ../dumps
scp root@217.114.43.187:~/TelegramBot/dumps/${filePath}/uploads.zip ../dumps
scp root@217.114.43.187:~/TelegramBot/dumps/${filePath}/db-dump.sql ../dumps

cat ../dumps/db-dump.sql | docker-compose exec -T DB psql -U develop xattaBot
rm -rf ../public
unzip ../dumps/uploads.zip
mv ./public ../
