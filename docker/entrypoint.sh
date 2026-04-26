#!/bin/bash

set -e

echo "Laravel Docker Entrypoint Starting..."

# Check if Laravel is installed
if [ ! -f "artisan" ]; then
    echo "Laravel not detected. Installing Laravel..."
    composer create-project laravel/laravel .
fi

# Install composer dependencies
if [ ! -d "vendor" ]; then
    echo "Installing composer dependencies..."
    composer install
fi

# Generate application key if not exists
if [ ! "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Clear application cache
echo "Clearing application cache..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Run database seeding (optional)
if [ "$SEED_DATABASE" = "true" ]; then
    echo "Seeding database..."
    php artisan db:seed --force
fi

echo "Laravel is ready!"
echo "Listening on 0.0.0.0:9000"

# Start PHP-FPM
php-fpm
