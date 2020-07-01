<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveryMethodsRequiresAddressField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('delivery_methods', function (Blueprint $table) {
            $table->boolean('requires_address')->default(true)->after('price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('delivery_methods', function (Blueprint $table) {
            $table->dropColumn('requires_address');
        });
    }
}
