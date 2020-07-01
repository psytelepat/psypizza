<?php

use Illuminate\Database\Seeder;

use \App\Psypizza\ProductCategory;

class ProductCategories extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('product_categories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Storage::disk('public')->deleteDirectory('product_categories');

        $categories = [
            [
                'slug' => 'pizza',
                'name' => 'Pizza',
                'description' => 'Our unique tasty pizzas.',
                'is_published' => true,
            ],
            [
                'slug' => 'salad',
                'name' => 'Salads',
                'description' => 'Fresh salads ready for order.',
                'is_published' => true,
            ],
            [
                'slug' => 'beverage',
                'name' => 'Вeverages',
                'description' => 'Refreshing and healthful.',
                'is_published' => true,
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}
