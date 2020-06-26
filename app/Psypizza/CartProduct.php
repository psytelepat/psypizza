<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use \App\Psypizaa\Cart;
use \App\Psypizaa\Product;

class CartProduct extends Model
{
    public $table = 'cart_products';
    protected $fillable = [
        'cart_id',
        'product_id',
        'amount',
        'original_price',
        'original_cost',
        'discount',
        'price',
        'cost',
    ];
    protected $hidden = ['created_at', 'update_at', 'deleted_at'];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
