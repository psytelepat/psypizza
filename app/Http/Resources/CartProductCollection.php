<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CartProductCollection extends ResourceCollection
{
    public $collects = 'App\Http\Resources\CartProduct';
}
