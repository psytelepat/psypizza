<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->nullable()->constrained('orders');
            $table->foreignId('user_id')->nullable()->constrained('users');

            $table->foreignId('promocode_id')->nullable()->constrained('promocodes');

            $table->decimal('original_products_cost', 10, 2);
            $table->decimal('products_discount', 10, 2);
            $table->decimal('products_cost', 10, 2);

            $table->foreignId('delivery_method_id')->constrained('delivery_methods');
            $table->decimal('delivery_price', 10, 2);

            $table->decimal('original_cost', 10, 2);
            $table->decimal('discount', 10, 2);
            $table->decimal('cost', 10, 2);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
}
