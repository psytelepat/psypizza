<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        $this->call(ProductCategories::class);
        $this->call(Products::class);
        $this->call(Promocodes::class);
        $this->call(DeliveryMethods::class);
    }
}
