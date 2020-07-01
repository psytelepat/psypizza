<?php

use Illuminate\Database\Seeder;

use \App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        User::create([
            'name' => 'Admin',
            'email' => 'admin@psypizza.ru',
            'phone' => '+79999999999',
            'password' => Hash::make('123123123'),
            'is_admin' => true
        ]);

        User::create([
            'name' => 'Mikhail',
            'surname' => 'Prokofyev',
            'email' => 'me@telepat.cc',
            'phone' => '+70000000000',
            'password' => Hash::make('123123123'),
            'address' => 'Some street, some building, some appartments',
            'is_admin' => false,
        ]);
    }
}
