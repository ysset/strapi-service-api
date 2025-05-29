PORT=1337
APP_NAME=strapi_api

build_app:
	@sudo npm install
	@sudo npm run build

deploy_headless:
	@make build_app
	@sudo npm run start
