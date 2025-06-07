build_app:
	@curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
	@apt-get install nsolid -y
	@node -v
	@sudo yarn
	@sudo yarn build

deploy_headless:
	@make build_app
	@pm2 delete all
	@pm2 kill
	@sudo npm i -g pm2
	@pm2 start npm -- start
