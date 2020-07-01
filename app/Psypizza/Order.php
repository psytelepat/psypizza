<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\User;
use \App\Psypizza\Cart;

class Order extends Model
{
    public const STATUS_CREATED = 1;
    public const STATUS_ACCEPTED = 2;
    public const STATUS_REJECTED = 988;
    public const STATUS_CANCELED = 999;
    public const STATUS_SUCCESS = 1000;

    use SoftDeletes;

    public $table = 'orders';
    protected $fillable = [
        'number',
        'token',

        'cart_id',
        
        'user_id',
        'name',
        'surname',
        'email',
        'phone',
        'address',

        'status',
    ];

    public function cart()
    {
        return $this->hasOne(Cart::class, 'id', 'cart_id');
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public static function generate_number(): string
    {
        $s = '';
        for ($i=4; $i>0; $i--) {
            $s .= chr(rand(65, 65 + 25));
        }
        return rand(100000, 999999) . '-' . $s;
    }
}
