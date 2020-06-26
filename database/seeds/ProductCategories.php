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

        $categories = [
            [
                'slug' => 'pizza',
                'name' => 'Pizza',
                'description' => 'Our unique saucy pizzas',
            ],
            [
                'slug' => 'salad',
                'name' => 'Salads',
                'description' => 'Fresh salads ready for order',
            ],
            [
                'slug' => 'bewerage',
                'name' => 'Bewerages',
                'description' => 'Refreshing and healthful',
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}
