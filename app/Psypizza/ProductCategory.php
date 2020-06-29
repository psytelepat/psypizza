<?php

namespace App\Psypizza;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Image;
use Storage;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

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

    public static $imagePath = 'product_categories/images/';

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
        $image->fit(400, 300);
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
