<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\User;
use \App\Psypizza\Cart;

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
    ];

    public function cart(): Cart
    {
        return $this->hasOne(Cart::class);
    }

    public function user(): User
    {
        return $this->hasOne(User::class);
    }
}
