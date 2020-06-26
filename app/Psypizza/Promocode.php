<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

use \App\Psypizza\Order;

class Promocode extends Model
{
    use SoftDeletes;
    
    public $table = "promocodes";
    protected $fillable = [ 'name', 'code', 'description', 'discount', ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function order()
    {
        return $this->belongsToMany(Order::class);
    }
}
