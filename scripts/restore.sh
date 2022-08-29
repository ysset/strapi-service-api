pm2 stop all

echo "enter dump file name from 'dumps' file"
read filePath
pm2 stop all
cat ../dumps/${filePath}/db-dump.sql | docker-compose exec -T DB psql -U develop xattaBot
unzip ../dumps/${filePath}/uploads.zip
mv ./public ../

