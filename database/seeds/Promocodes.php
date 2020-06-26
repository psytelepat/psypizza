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

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $code = implode('', $faker->randomElements(['a','b','c','d','e','r',], 4)) . $faker->randomNumber(4);
            Promocode::create([
                'name' => $code,
                'code' => strtoupper($code),
                'discount' => rand(3, 10) * 5,
                'is_available' => true,
            ]);
        }
    }
}
