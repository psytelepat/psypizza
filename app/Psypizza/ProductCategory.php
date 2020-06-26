<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Psypizza\Product;

class ProductCategory extends Model
{
    use SoftDeletes;

    public $table = 'product_categories';
    protected $fillable = ['slug', 'name', 'description', 'image', 'is_published',];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
