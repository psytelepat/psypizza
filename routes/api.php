<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('product_categories', 'ProductCategoriesController');
Route::apiResource('products', 'ProductsController');
Route::apiResource('orders', 'OrdersController');
Route::apiResource('promocodes', 'PromocodesController');
Route::apiResource('delivery_methods', 'DeliveryMethodsController');
