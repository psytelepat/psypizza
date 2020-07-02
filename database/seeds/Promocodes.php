<?php

use Illuminate\Database\Seeder;

use \App\Psypizza\Promocode;

class Promocodes extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('promocodes')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        foreach ([10, 15, 20, 25, 30] as $discount) {
            Promocode::create([
                'name' => $discount.'% DISCOUNT',
                'code' => 'PROMO'.$discount,
                'discount' => $discount,
                'description' => 'Gives '.$discount.'% discount',
                'is_available' => true,
            ]);
        }
    }
}
