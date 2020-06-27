<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Psypizza\ProductCategory;

class Product extends Model
{
    use SoftDeletes;

    public $table = 'products';
    protected $fillable = [
        'category_id',
        'slug',
        'name',
        'description',
        'image',
        'in_stock',
        'is_published',
        'price',
        'discount',
        'sku',
        'ean13',
    ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }
}
