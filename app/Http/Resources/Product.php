<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'category_id' => $this->category->id,
            'name' => $this->name,
            'image' => $this->image,
            'description' => $this->description,
            'sku' => $this->sku,
            'ean13' => $this->ean13,
            'price' => $this->price,
            'is_published' => $this->is_published ? 1 : 0,
            'in_stock' => $this->in_stock ? 1 : 0,
        ];
    }
}
