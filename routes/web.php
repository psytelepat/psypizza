<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$x = 'MainController@index';
Route::get('/', $x);
Route::get('cart', $x);
Route::get('orders', 'MainController@orders');
Route::get('orders/{id}/{order_token?}', 'MainController@order');

Route::prefix('admin')->group(function () {
    $x = 'AdminController@index';
    Route::get('', $x);
    Route::get('products', $x);
    Route::get('products/{id}', $x);
    Route::get('product_categories', $x);
    Route::get('product_categories/{id}', $x);
    Route::get('promocodes', $x);
    Route::get('promocodes/{id}', $x);
    Route::get('delivery_methods', $x);
    Route::get('delivery_methods/{id}', $x);
});

Route::get('mailable', function () {
    $order = App\Psypizza\Order::orderBy('id', 'desc')->first();
    return new App\Mail\OrderPlaced($order);
});

Route::get('start.json', 'MainController@start');
Route::get('user.json', 'MainController@user');
Route::get('cart.json', 'CartController@index');
Route::get('cart/recalc.json', 'CartController@recalc');
Route::post('cart/set.json', 'CartController@setProduct');
Route::post('cart/remove.json', 'CartController@removeProduct');
Route::get('cart/flush.json', 'CartController@flush');
Route::post('cart/promocode.json', 'CartController@promocode');
Route::delete('cart/promocode.json', 'CartController@promocode');
Route::post('cart/delivery_method.json', 'CartController@deliveryMethod');
Route::post('cart/currency.json', 'CartController@currency');
Route::post('cart/place_order.json', 'CartController@placeOrder');

Auth::routes(['verify' => true]);

// Route::get('/home', 'HomeController@index')->name('home');
