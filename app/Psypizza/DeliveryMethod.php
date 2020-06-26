<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;

use \App\Psypizaa\Order;

class DeliveryMethod extends Model
{
    public $table = 'delivery_methods';
    protected $fillable = ['name', 'description', 'price'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function order()
    {
        return $this->belongsToMany(Order::class);
    }
}
