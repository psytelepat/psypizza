<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')->constrained('product_categories');

            $table->string('slug')->unique();

            $table->string('ean13')->nullable()->unique();
            $table->string('sku')->nullable()->unique();

            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();

            $table->decimal('price', 10, 2);

            $table->boolean('in_stock')->default(false);
            $table->boolean('is_published')->default(false);

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
        Schema::dropIfExists('products');
    }
}
