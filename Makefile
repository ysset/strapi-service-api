PORT=1337
APP_NAME=strapi_api

build_app:
	@curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
	@sudo apt install -y nodejs
	@node -v
	@sudo yarn
	@sudo yarn build

deploy_headless:
	@make build_app
