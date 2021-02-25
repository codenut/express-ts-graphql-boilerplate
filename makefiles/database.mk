### DATABASE
# ¯¯¯¯¯¯¯¯

database.connect: ## Connect to database
	docker-compose exec sample_db psql -Upostgres

database.migrate:
	docker-compose run --rm sample_server yarn typeorm migration:generate -n migration

database.upgrade:
	docker-compose run --rm sample_server yarn typeorm migration:run
