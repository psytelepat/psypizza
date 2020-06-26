<?php

use Illuminate\Database\Seeder;

use \App\Psypizza\DeliveryMethod;

class DeliveryMethods extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('delivery_methods')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $delivery_methods = [
            [
                'name' => 'Default',
                'description' => 'Default courier delivery',
                'price' => 5,
            ],
        ];

        foreach ($delivery_methods as $delivery_method) {
            DeliveryMethod::create($delivery_method);
        }
    }
}
