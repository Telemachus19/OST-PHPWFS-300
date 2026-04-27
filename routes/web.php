<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('posts.index');
});

Route::resource('posts', PostController::class);
