### SERVER
# ¯¯¯¯¯¯¯¯¯¯¯

server.install: ## Install server with its dependencies
	docker-compose run --rm sample_server yarn

server.start: ## Start server in its docker container
	docker-compose up sample_server

server.bash: ## Connect to server to lauch commands
	docker-compose exec sample_server bash
