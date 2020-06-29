<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Support\Str;

use App\Psypizza\ProductCategory;

use File;
use Image;
use Storage;
use Illuminate\Http\UploadedFile;

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

    public static $imagePath = 'products/images/';
    
    protected function generateFileName(UploadedFile $file) : string
    {
        do {
            $filename = Str::random(16) . '.jpg';
        } while (Storage::disk('public')->exists(self::$imagePath.$filename));
        return $filename;
    }

    public function handleImageUpload(UploadedFile $file)
    {
        $image = Image::make($file);
        $image->resize(300, 300);
        $filename = $this->generateFileName($file);
        $old_filename = $this->image;
        if (Storage::disk('public')->put(self::$imagePath.$filename, $image->encode('jpg'))) {
            $this->image = $filename;
            $this->save();

            if ($old_filename) {
                Storage::disk('public')->delete(self::$imagePath.$old_filename);
            }
        }
    }
}
