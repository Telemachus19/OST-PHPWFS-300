<?php

use App\Http\Controllers\Api\PostApiController;
use App\Http\Controllers\Api\UserApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostApiController::class)->names('api.posts')->only(['index', 'show', 'store']);
    Route::apiResource('users', UserApiController::class)->names('api.users')->only(['index', 'show', 'store']);
});
