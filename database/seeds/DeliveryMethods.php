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
                'name' => 'Courier delivery',
                'description' => 'Our courier will deliver your order in 30-40 minutes.',
                'price' => 5,
                'requires_address' => true,
            ],
            [
                'name' => 'Pick up',
                'description' => 'Order and pick up at the restaurant by yourself.',
                'price' => 0,
                'requires_address' => false,
            ],
        ];

        foreach ($delivery_methods as $delivery_method) {
            DeliveryMethod::create($delivery_method);
        }
    }
}
