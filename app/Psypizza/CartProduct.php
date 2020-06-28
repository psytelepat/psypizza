<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use \App\Psypizza\Cart;
use \App\Psypizza\Product;

class CartProduct extends Model
{
    use SoftDeletes;

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
