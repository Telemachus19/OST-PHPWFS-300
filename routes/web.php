<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/posts');

Route::patch('posts/{post}/restore', [PostController::class, 'restore'])->name('posts.restore');
Route::resource('posts', PostController::class);
