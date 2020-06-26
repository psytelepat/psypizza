<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\User;
use \App\Psypizza\Cart;
use \App\Psypizza\Promocode;
use \App\Psypizza\DeiveryMethod;

class Order extends Model
{
    use SoftDeletes;

    public $table = 'orders';
    protected $fillable = [
        'cart_id',
        
        'user_id',
        'name',
        'surname',
        'email',
        'phone',
        'address',

        'delivery_method_id',
        'delivery_price',

        'cost',
    ];

    public function cart(): Cart
    {
        return $this->hasOne(Cart::class);
    }

    public function user(): User
    {
        return $this->hasOne(User::class);
    }

    public function deliveryMethod(): DeiveryMethod
    {
        return $this->hasOne(DeiveryMethod::class);
    }

    public function products()
    {
        return $this->cart->products;
    }
}
