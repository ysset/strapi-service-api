build_app:
	@curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
	@apt-get install nsolid -y
	@node -v
	@sudo yarn
	@sudo yarn build

deploy_headless:
	@make build_app
	@pm2 start npm -- start
