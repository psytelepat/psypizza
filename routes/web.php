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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('cart.json', 'CartController@index');
Route::get('cart/recalc.json', 'CartController@recalc');
Route::post('cart/set.json', 'CartController@setProduct');
Route::post('cart/remove.json', 'CartController@removeProduct');
Route::get('cart/flush.json', 'CartController@flush');

// Route::get('/home', 'HomeController@index')->name('home');
