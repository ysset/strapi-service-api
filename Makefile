PORT=1337
APP_NAME=strapi_api

build_app:
	@\. "$HOME/.nvm/nvm.sh"
	@nvm install 18
	@nvm use 18
	@sudo yarn
	@sudo yarn build

deploy_headless:
	@make build_app
	@sudo yarn start
