# Makefile
# -------------------------------------------------
# Simple commands to manage dev/prod containers

SHELL := /bin/bash

.PHONY: help dev prod stop-dev stop-prod logs clean

help:
	@echo "Available commands:"
	@echo "  make dev        - Start dev environment"
	@echo "  make prod       - Start production environment"
	@echo "  make stop-dev   - Stop dev environment"
	@echo "  make stop-prod  - Stop production environment"
	@echo "  make logs       - View logs from dev environment"
	@echo "  make clean      - Remove all Docker containers, volumes, and images"

dev:
	@docker-compose -f docker-compose.dev.yml up -d

prod:
	@docker-compose -f docker-compose.prod.yml up -d --build

stop-dev:
	@docker-compose -f docker-compose.dev.yml down

stop-prod:
	@docker-compose -f docker-compose.prod.yml down

logs:
	@docker-compose -f docker-compose.dev.yml logs -f --tail=100

clean:
	@docker-compose -f docker-compose.dev.yml down -v
	@docker-compose -f docker-compose.prod.yml down -v
	@docker system prune -af
