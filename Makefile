PORT=1337
APP_NAME=strapi_api

build_app:
	@bash -l -c 'nvm exec 18 yarn'
	@sudo yarn
	@sudo yarn build

deploy_headless:
	@make build_app
	@sudo yarn start
