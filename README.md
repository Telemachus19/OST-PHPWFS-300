# OST-PHPFWS-300

This repository contains the source code for the OSt-PHPWFS-300 course. It now uses Laravel Sail instead of Manual Docker Configuartion -- though that was fun --. The repo should or will contain other resources necessary for the course.

## Running

```
sail up -d --build --remove-orphans
sail artisan migrate --seed
sail npm run dev  # Fro vite assets
```
